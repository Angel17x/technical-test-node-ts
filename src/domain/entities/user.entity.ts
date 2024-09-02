import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}
