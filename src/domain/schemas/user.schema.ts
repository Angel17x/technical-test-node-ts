import mongoose, { Schema } from "mongoose";
import { IUser } from "../entities";

const UserSchema = new Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString()},
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
}, { versionKey: false });

export const User = mongoose.model<IUser>("User", UserSchema);
