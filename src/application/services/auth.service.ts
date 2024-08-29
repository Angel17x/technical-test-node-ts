import { IUser } from "../../domain/entities";

export interface IAuthService {
  sign(user:{ email:string, password:string }): Promise<string>;
  verifyToken(token: string): Promise<IUser | null>;
}