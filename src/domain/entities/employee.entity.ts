import mongoose from "mongoose";
import { IUser } from "./user.entity";

export interface IEmployee extends Document { 
  _id: mongoose.Types.ObjectId;
  userId: IUser;
  position: string;
  departament: string;
}