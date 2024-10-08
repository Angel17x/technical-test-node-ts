import mongoose from "mongoose";
import { ICategory } from "./category.entity";
import { IEmployee } from "./employee.entity";


export interface IEvaluation extends Document {
  _id: mongoose.Types.ObjectId;
  employeeId: IEmployee;
  evaluatorId: IEmployee;
  createAt: Date;
  updateAt: Date;
  comments: string;
  categories: ICategory[];
}