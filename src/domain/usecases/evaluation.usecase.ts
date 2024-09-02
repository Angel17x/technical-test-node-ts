import { StatusCodes } from "http-status-codes";
import { EvaluationRepositoryImpl } from "../../infraestructure/repositories";
import { ICategory, IEvaluation } from "../entities";
import { CustomError } from "../exceptions/CustomException";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateEvaluationDto, UpdateEvaluationDto } from "../../application/dto";

export class EvaluationUseCase {
  evaluationRepository: EvaluationRepositoryImpl
  constructor() {
    this.evaluationRepository = new EvaluationRepositoryImpl();
  }
  async getAllEvaluations(): Promise<IEvaluation[]> {
    const result = await this.evaluationRepository.findAll();
    if(result.length > 0) {
      return result.map((evaluation:IEvaluation) => ({
        _id: evaluation._id,
        employeeId: {
          _id: evaluation.employeeId._id,
          userId: evaluation.employeeId.userId,
          position: evaluation.employeeId.position,
          departament: evaluation.employeeId.departament
        },
        evaluatorId: {
          _id: evaluation.evaluatorId._id,
          userId: evaluation.evaluatorId.userId,
          position: evaluation.evaluatorId.position,
          departament: evaluation.evaluatorId.departament
        },
        createAt: evaluation.createAt,
        updateAt: evaluation.updateAt,
        comments: evaluation.comments,
        categories: evaluation.categories
      })) as IEvaluation[];
    }
    return result;
  }
  async getEvaluationById(id: string): Promise<IEvaluation | undefined> {
    if (!id || id.trim() === "") throw new CustomError("id is require", StatusCodes.BAD_REQUEST, new Date());
    const evaluation = await this.evaluationRepository.findById(id);
    if(!!evaluation) {
      return {
        _id: evaluation._id,
        employeeId: {
          _id: evaluation.employeeId._id,
          userId: evaluation.employeeId.userId,
          position: evaluation.employeeId.position,
          departament: evaluation.employeeId.departament
        },
        evaluatorId: {
          _id: evaluation.evaluatorId._id,
          userId: evaluation.evaluatorId.userId,
          position: evaluation.evaluatorId.position,
          departament: evaluation.evaluatorId.departament
        },
        createAt: evaluation.createAt,
        updateAt: evaluation.updateAt,
        comments: evaluation.comments,
        categories: evaluation.categories
      } as IEvaluation;
    }
    throw new CustomError("evaluation not found", StatusCodes.NOT_FOUND, new Date());
  }
  async createEvaluation(evaluation: IEvaluation): Promise<IEvaluation> {
    if (!evaluation) throw new CustomError("evaluation is require", StatusCodes.BAD_REQUEST, new Date());
    const evaluationDto = plainToInstance(CreateEvaluationDto, evaluation);
    const errors = await validate(evaluationDto);
    if (errors.length > 0) throw new CustomError("Error creating evaluation", StatusCodes.BAD_REQUEST, new Date(), errors);
    return this.evaluationRepository.create({ ...evaluation, createAt: new Date(), updateAt: new Date()});
  }
  
  async updateEvaluation(id: string, updatedEvaluation: UpdateEvaluationDto): Promise<IEvaluation | undefined> {
    if (!id || id.trim() === "") throw new CustomError("id is require", StatusCodes.BAD_REQUEST, new Date());
    const evaluation = await this.evaluationRepository.findById(id);
    if(!evaluation) throw new CustomError("evaluation not found", StatusCodes.BAD_REQUEST, new Date());
    if (!updatedEvaluation) throw new CustomError("evaluation is require", StatusCodes.BAD_REQUEST, new Date());
    const evaluationDto = plainToInstance(UpdateEvaluationDto, 
      { 
        comments: updatedEvaluation.comments,
        categories: updatedEvaluation.categories
      }
    );
    const errors = await validate(evaluationDto);
    if(errors.length > 0) throw new CustomError('evaluation update error', StatusCodes.BAD_REQUEST, new Date(), errors);
    const updateCategories = this._updateCategories(evaluation.categories, updatedEvaluation.categories); 
    const updatedData = { 
      employeeId: evaluation.employeeId,
      evaluatorId: evaluation.evaluatorId,
      createAt: evaluation.createAt,
      updateAt: new Date(),
      comments: updatedEvaluation.comments ?? evaluation.comments,
      categories: updateCategories
    } as IEvaluation;

    return this.evaluationRepository.update(id, updatedData);
  }

  async deleteEvaluation(id: string): Promise<boolean> {
    return this.evaluationRepository.delete(id);
  }

  private _updateCategories(oldCategories: ICategory[], newCategories: ICategory[]): ICategory[] {
    const newCategoryMap = new Map(newCategories.map(cat => [cat.name, cat]));
    const mergedCategories = oldCategories.map(oldCat => 
        newCategoryMap.get(oldCat.name) || oldCat
    );
    // Agrega las nuevas categorías que no están en las categorías antiguas
    const uniqueNewCategories = newCategories.filter(newCat => !oldCategories.some(oldCat => oldCat.name === newCat.name));
    
    return [...mergedCategories, ...uniqueNewCategories];
  }
}