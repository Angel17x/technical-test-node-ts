import mongoose, { Schema } from "mongoose";
import { IFeedback } from "../entities";

const FeedbackSchema = new Schema<IFeedback>({
  idEvaluation: { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation', required: true },  
  date: { type: String, required: true },
  comments: { type: String, required: true },
});

export const Feedback = mongoose.model("Feedback", FeedbackSchema);
