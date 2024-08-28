import mongoose from "mongoose";

export interface IEvaluation {
  idUser: mongoose.Schema.Types.ObjectId;
  idEmployee: mongoose.Schema.Types.ObjectId;
  date: string;
  comments: string;
  score: number;
}