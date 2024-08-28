import mongoose from "mongoose";

export interface IFeedback {
  idEvaluation: mongoose.Schema.Types.ObjectId;
  comments: string;
  date: string;
}