import { StatusCodes } from "http-status-codes";
import { UserRepositoryImpl } from "../../infraestructure/repositories";
import { IUser } from "../entities";
import { CustomError } from "../exceptions/CustomException";
import { IUserRepository } from "../repositories";
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "../../application/dto";
import { validate } from "class-validator";

export class UserUseCase {
  userRepo: IUserRepository;
  constructor() {
    this.userRepo = new UserRepositoryImpl();
  }
  async getAllUsers(): Promise<IUser[]> {
    try {
      return await this.userRepo.findAll();
    } catch (error) {
      throw new CustomError(
        "Error fetching users",
        StatusCodes.INTERNAL_SERVER_ERROR,
        new Date()
      );
    }
  }
  async getUserById(id: string): Promise<IUser | null> {
    if (id === undefined) throw new Error("User ID is required");
    return this.userRepo.findById(id);
  }
  async createUser(user: IUser): Promise<IUser> {
    try {
      if (!user) throw new CustomError("User is require", StatusCodes.BAD_REQUEST, new Date());
      const userDto = plainToInstance(CreateUserDto, user);
      const errors = await validate(userDto);
      if (errors.length > 0) throw new CustomError("Error creating user", StatusCodes.BAD_REQUEST, new Date(), errors);
      const exists:boolean = this.userRepo.findByEmail(user.email) !== null;
      if(exists) throw new CustomError("This user already exists", StatusCodes.BAD_REQUEST, new Date());
      return this.userRepo.create(user);
    } catch (error) {
      if (error instanceof CustomError) throw new CustomError(error.message, error.statusCode, error.timeStamp, error.error);
      throw new CustomError(error.message ?? "Error creating user", StatusCodes.INTERNAL_SERVER_ERROR, new Date());
    }
  }
  async updateUser(id: string, updatedUser: IUser): Promise<IUser | null> {
    return this.userRepo.update(id, updatedUser);
  }
  async deleteUser(id: string): Promise<boolean> {
    return this.userRepo.delete(id);
  }
}
