import mongoose, { Schema } from 'mongoose';
import { IEvaluation } from '../entities';


const EvaluationSchema: Schema = new Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString()},
  employeeId: { type: String, default: () => new mongoose.Types.ObjectId().toString(), ref: 'Employee', required: true },
  evaluatorId: { type: String, default: () => new mongoose.Types.ObjectId().toString(), ref: 'Employee', required: true },
  createAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
  comments: { type: String, required: false },
  categories: [{
    name: { type: String, required: true },
    score: { type: Number, required: true }
  }]
}, { versionKey: false });

export const Evaluation = mongoose.model<IEvaluation>('Evaluation', EvaluationSchema);