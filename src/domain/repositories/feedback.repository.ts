import { IFeedback } from "../entities";

export interface IFeedbackRepository {
  findAll(): Promise<IFeedback[]>;
  findById(id: string): Promise<IFeedback | null>;
  create(user: IFeedback): Promise<IFeedback>;
  update(id: string, updatedUser: IFeedback): Promise<IFeedback | null>;
  delete(id: string): Promise<boolean>;
}
