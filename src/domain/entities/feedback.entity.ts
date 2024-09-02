import mongoose from "mongoose";

export interface IFeedback {
  _id: mongoose.Types.ObjectId;
  idEvaluation: mongoose.Schema.Types.ObjectId;
  comments: string;
  date: string;
}