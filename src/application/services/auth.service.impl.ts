import { IUser } from "../../domain/entities";
import { AuthUseCase } from "../../domain/usecases";
import { IAuthService } from "./auth.service";
import jwt from "jsonwebtoken";

export class AuthServiceImpl implements IAuthService {
  authUseCase: AuthUseCase;
  constructor() {
    this.authUseCase = new AuthUseCase();
  }
  sign(user:{ email:string, password:string }): Promise<string> {
    return this.authUseCase.sign(user);
  }
  verifyToken(token: string): Promise<IUser | null> {
    try {
      const decodedToken = jwt.verify(token, "NOLATECH_SECRET_KEY");
      return Promise.resolve(decodedToken as IUser);
    } catch (error) {
      return Promise.resolve(null);
    }
  }

}