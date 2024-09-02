import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}
