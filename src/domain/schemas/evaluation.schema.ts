import mongoose, { Schema } from 'mongoose';
import { IEvaluation } from '../entities';


const EvaluationSchema: Schema = new Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  evaluatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  createAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
  comments: { type: String, required: false },
  categories: [{
    name: { type: String, required: true },
    score: { type: Number, required: true }
  }]
}, { versionKey: false });

export const Evaluation = mongoose.model<IEvaluation>('Evaluation', EvaluationSchema);