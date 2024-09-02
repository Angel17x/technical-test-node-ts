import { StatusCodes } from "http-status-codes";
import { EmployeeRepositoryImpl, EvaluationRepositoryImpl } from "../../infraestructure/repositories";
import { ICategory, IEvaluation } from "../entities";
import { CustomError } from "../exceptions/CustomException";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateEvaluationDto, UpdateEvaluationDto } from "../../application/dto";
import { IEmployeeRepository, IEvaluationRepository } from "../repositories";
import { CategoryEvaluation } from "../../application/enums/CategoryEvaluation";

export class EvaluationUseCase {
  evaluationRepository: IEvaluationRepository;
  employeeRepository: IEmployeeRepository;
  constructor() {
    this.evaluationRepository = new EvaluationRepositoryImpl();
    this.employeeRepository = new EmployeeRepositoryImpl();
  }
  async getAllEvaluations(): Promise<IEvaluation[]> {
    return await this.evaluationRepository.findAll();
  }
  async getEvaluationById(id: string): Promise<IEvaluation | undefined> {
    if (!id || id.trim() === "") throw new CustomError("id is require", StatusCodes.BAD_REQUEST, new Date());
    const evaluation = await this.evaluationRepository.findById(id);
    if(!evaluation) throw new CustomError("evaluation not found", StatusCodes.NOT_FOUND, new Date());
    return evaluation;
  }

  async getEvaluationByEmployeeId(employeeId: string): Promise<ICategory[]> {
    if (!employeeId || employeeId.trim() === "") throw new CustomError("id is require", StatusCodes.BAD_REQUEST, new Date());
    const evaluation = await this.evaluationRepository.findByEmployeeId(employeeId);
    if(!evaluation || evaluation.length === 0) throw new CustomError("evaluation not found", StatusCodes.NOT_FOUND, new Date());
    return this._calculateAverages(evaluation);
  }
  async createEvaluation(evaluation: IEvaluation): Promise<IEvaluation> {
    if (!evaluation) throw new CustomError("evaluation is require", StatusCodes.BAD_REQUEST, new Date());
    const evaluationDto = plainToInstance(CreateEvaluationDto, evaluation);
    const errors = await validate(evaluationDto);
    if (errors.length > 0) throw new CustomError("Error creating evaluation", StatusCodes.BAD_REQUEST, new Date(), errors);
    const employee = await this.employeeRepository.findById(evaluation.employeeId.toString());
    if(!employee) throw new CustomError("employee not found", StatusCodes.NOT_FOUND, new Date());
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

  private _calculateAverages = (evaluations: IEvaluation[]) => {
    const totalScores: { [key: string]: number } = {};
    const count: { [key: string]: number } = {};

    evaluations.forEach(evaluation => {
        evaluation.categories.forEach(category => {
            if (!totalScores[category.name]) {
                totalScores[category.name] = 0;
                count[category.name] = 0;
            }
            totalScores[category.name] += category.score;
            count[category.name] += 1;
        });
    });
    const averages: ICategory[] = [];
    for (const category in totalScores) {
        const cat = category as CategoryEvaluation;
        const sc = parseFloat((totalScores[category] / count[category]).toFixed(2)) ?? 0;
        averages.push({ name: cat, score:  sc})
    }
    
    return averages;
  };
}