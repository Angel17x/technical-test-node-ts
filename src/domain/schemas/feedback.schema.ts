import mongoose, { Schema } from "mongoose";
import { IFeedback } from "../entities";

const FeedbackSchema = new Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString()},
  idEvaluation: { type: String, default: () => new mongoose.Types.ObjectId().toString(), ref: 'Evaluation', required: true },  
  date: { type: String, required: true },
  comments: { type: String, required: true },
}, { versionKey: false });

export const Feedback = mongoose.model<IFeedback>("Feedback", FeedbackSchema);
