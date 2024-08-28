import mongoose, { Schema } from "mongoose";
import { IEvaluation } from "../entities";

const EvaluationSchema = new Schema<IEvaluation>({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  idEmployee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },  
  date: { type: String, required: true },
  comments: { type: String, required: true },
  score: { type: Number, required: true },
});

export const Evaluation = mongoose.model("Evaluation", EvaluationSchema);
