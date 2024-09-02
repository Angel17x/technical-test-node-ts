import { IUser } from "./user.entity";

export interface IEmployee extends Document { 
  userId: IUser;
  position: string;
  departament: string;
}