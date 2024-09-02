import mongoose, { Schema } from "mongoose";
import { IEmployee } from "../entities";

const EmployeeSchema = new Schema({
  position: { type: String, required: true },
  departament: { type: String, required: true },
  userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },  
}, { versionKey: false });

export const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);
