import mongoose, { Schema } from "mongoose";
import { IEmployee } from "../entities";

const EmployeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  departament: { type: String, required: true },
  idUsuario: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },  
});

export const Employee = mongoose.model("Employee", EmployeeSchema);
