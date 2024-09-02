import { StatusCodes } from "http-status-codes";
import { EvaluationRepositoryImpl } from "../../infraestructure/repositories";
import { IEvaluation } from "../entities";
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
        employeeId: {
          userId: evaluation.employeeId.userId,
          position: evaluation.employeeId.position,
          departament: evaluation.employeeId.departament
        },
        evaluatorId: {
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
    const evaluation = await this.evaluationRepository.findById(id);
    if(evaluation !== undefined) {
      return {
        employeeId: {
          userId: evaluation.employeeId.userId,
          position: evaluation.employeeId.position,
          departament: evaluation.employeeId.departament
        },
        evaluatorId: {
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
    return evaluation;
  }
  async createEvaluation(evaluation: IEvaluation): Promise<IEvaluation> {
    if (!evaluation) throw new CustomError("evaluation is require", StatusCodes.BAD_REQUEST, new Date());
    const evaluationDto = plainToInstance(CreateEvaluationDto, evaluation);
    const errors = await validate(evaluationDto);
    if (errors.length > 0) throw new CustomError("Error creating evaluation", StatusCodes.BAD_REQUEST, new Date(), errors);
    return this.evaluationRepository.create({ ...evaluation, createAt: new Date(), updateAt: new Date()});
  }
  
  async updateEvaluation(id: string, updatedEvaluation: UpdateEvaluationDto): Promise<IEvaluation | undefined> {
    const evaluation = await this.evaluationRepository.findById(id);
    if (!updatedEvaluation) throw new CustomError("evaluation is require", StatusCodes.BAD_REQUEST, new Date());
    const evaluationDto = plainToInstance(UpdateEvaluationDto, 
      { 
        comments: updatedEvaluation.comments,
        categories: updatedEvaluation.categories
      }
    );
    const errors = await validate(evaluationDto);
    if(errors.length > 0) throw new CustomError('evaluation update error', StatusCodes.BAD_REQUEST, new Date(), errors);
    const newCategories = [...evaluation.categories, ...updatedEvaluation.categories]; 
    const updatedData = { 
      employeeId: evaluation.employeeId,
      evaluatorId: evaluation.evaluatorId,
      createAt: evaluation.createAt,
      updateAt: new Date(),
      comments: updatedEvaluation.comments ?? evaluation.comments,
      categories: newCategories
    } as IEvaluation;

    return this.evaluationRepository.update(id, updatedData);
  }

  async deleteEvaluation(id: string): Promise<boolean> {
    return this.evaluationRepository.delete(id);
  }
}