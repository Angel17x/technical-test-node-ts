import { plainToInstance } from "class-transformer";
import { LoginDto } from "../../application/dto";
import { UserRepositoryImpl } from "../../infraestructure/repositories";
import { IUserRepository } from "../repositories";
import jwt from "jsonwebtoken";
import { validate } from "class-validator";
import { CustomError } from "../exceptions/CustomException";
import { StatusCodes } from "http-status-codes";

export class AuthUseCase {
  userRepo: IUserRepository;
  constructor() {
    this.userRepo = new UserRepositoryImpl();
  }
  async sign(user: { email:string, password:string }): Promise<string> {
    if (!user) throw new CustomError("User is required", StatusCodes.BAD_REQUEST, new Date());
    const userLoginDto = plainToInstance(LoginDto, user);
    const errors = await validate(userLoginDto);
    if (errors.length > 0) throw new CustomError("Error login user", StatusCodes.BAD_REQUEST, new Date(), errors);
    const userLogin = await this.userRepo.findByEmailAndPassword(user.email, user.password);
   
    const token = jwt.sign({
      id: userLogin.id,
      email: userLogin.email,
      name: userLogin.name,
      lastname: userLogin.lastname,
      role: userLogin.role,
    }, "NOLATECH_SECRET_KEY", { expiresIn: "1d" });
    return Promise.resolve(token);
  }
}