import { IEmployee } from "../../domain/entities";

export interface IEmployeeService {
  findAll(): Promise<IEmployee[]>;
  findById(id: string): Promise<IEmployee | null>;
  create(user: IEmployee): Promise<IEmployee>;
  update(id: string, updatedUser: IEmployee): Promise<IEmployee | null>;
  delete(id: string): Promise<boolean>;
}
