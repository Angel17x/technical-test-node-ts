import { IEvaluation } from "../entities";

export interface IEvaluationRepository {
  findAll(): Promise<IEvaluation[]>;
  findById(id: string): Promise<IEvaluation | undefined>;
  findByEmployeeId(employeeId: string): Promise<IEvaluation[] | undefined>;
  create(user: IEvaluation): Promise<IEvaluation>;
  update(id: string, updatedUser: IEvaluation): Promise<IEvaluation | undefined>;
  delete(id: string): Promise<boolean>;
}
