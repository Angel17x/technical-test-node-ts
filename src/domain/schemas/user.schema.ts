import mongoose, { Schema } from "mongoose";
import { IUser } from "../entities";

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export const User = mongoose.model("User", UserSchema);
