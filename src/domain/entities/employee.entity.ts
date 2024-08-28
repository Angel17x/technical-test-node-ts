import mongoose from "mongoose";

export interface IEmployee { 
  idUsuario: mongoose.Schema.Types.ObjectId;
  name: string;
  position: string;
  departament: string;
}