import { ICategory } from "./category.entity";
import { IEmployee } from "./employee.entity";


export interface IEvaluation extends Document {
  employeeId: IEmployee;
  evaluatorId: IEmployee;
  createAt: Date;
  updateAt: Date;
  comments: string;
  categories: ICategory[];
}