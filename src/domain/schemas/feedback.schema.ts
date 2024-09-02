import mongoose, { Schema } from "mongoose";
import { IFeedback } from "../entities";

const FeedbackSchema = new Schema({
  idEvaluation: { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation', required: true },  
  date: { type: String, required: true },
  comments: { type: String, required: true },
}, { versionKey: false });

export const Feedback = mongoose.model<IFeedback>("Feedback", FeedbackSchema);
