import { ICategory, IEvaluation } from "../../domain/entities";
import { EvaluationUseCase } from "../../domain/usecases";
import { IEvaluationService } from "./evaluation.service";

export class EvaluationServiceImpl implements IEvaluationService {
  EvaluationUseCase: EvaluationUseCase;
  constructor() {
    this.EvaluationUseCase = new EvaluationUseCase();
  }
  findAll(): Promise<IEvaluation[]> {
    return this.EvaluationUseCase.getAllEvaluations();
  }
  findById(id: string): Promise<IEvaluation | null> {
    return this.EvaluationUseCase.getEvaluationById(id);
  }
  findByEmployeeId(employeeId: string): Promise<ICategory[] | null> {
    return this.EvaluationUseCase.getEvaluationByEmployeeId(employeeId);
  }
  create(evaluation: IEvaluation): Promise<IEvaluation> {
    return this.EvaluationUseCase.createEvaluation(evaluation);
  }
  update(id: string, updatedEvaluation: IEvaluation): Promise<IEvaluation | null> {
    return this.EvaluationUseCase.updateEvaluation(id, updatedEvaluation);
  }
  delete(id: string): Promise<boolean> {
    return this.EvaluationUseCase.deleteEvaluation(id);
  }

}
