import { UserRepositoryImpl } from "../../infraestructure/repositories";
import { IUser } from "../entities";
import { IUserRepository } from "../repositories";

export class UserUseCase {
  userRepo: IUserRepository;
  constructor() {
    this.userRepo = new UserRepositoryImpl();
  }
  async getAllUsers(): Promise<IUser[]> {
    return this.userRepo.findAll();
  }
  async getUserById(id: string): Promise<IUser | null> {
    if (id === undefined) throw new Error("User ID is required");
    return this.userRepo.findById(id);
  }
  async createUser(user: IUser): Promise<IUser> {
    return this.userRepo.create(user);
  }
  async updateUser(id: string, updatedUser: IUser): Promise<IUser | null> {
    return this.userRepo.update(id, updatedUser);
  }
  async deleteUser(id: string): Promise<boolean> {
    return this.userRepo.delete(id);
  }
}
