import { IUser } from "../../domain/entities";

export interface AuthService {
  sign(user:{ email:string, password:string }): Promise<string>;
  verifyToken(token: string): Promise<IUser | null>;
}