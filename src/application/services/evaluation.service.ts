import { ICategory, IEvaluation } from "../../domain/entities";

export interface IEvaluationService {
  findAll(): Promise<IEvaluation[]>;
  findById(id: string): Promise<IEvaluation | null>;
  findByEmployeeId(employeeId: string): Promise<ICategory[] | null>;
  create(user: IEvaluation): Promise<IEvaluation>;
  update(id: string, updatedUser: IEvaluation): Promise<IEvaluation | null>;
  delete(id: string): Promise<boolean>;
}
