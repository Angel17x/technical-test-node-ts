import { IUser } from "../../domain/entities";
import { UserUseCase } from "../../domain/usecases";
import { IUserService } from "./user.service";

export class UserServiceImpl implements IUserService {
  userUserCase: UserUseCase;
  constructor() {
    this.userUserCase = new UserUseCase();
  }
  findAll(): Promise<IUser[]> {
    return this.userUserCase.getAllUsers();
  }
  findById(id: string): Promise<IUser | null> {
    return this.userUserCase.getUserById(id);
  }
  create(user: IUser): Promise<IUser> {
    return this.userUserCase.createUser(user);
  }
  update(id: string, updatedUser: IUser): Promise<IUser | null> {
    return this.userUserCase.updateUser(id, updatedUser);
  }
  delete(id: string): Promise<boolean> {
    return this.userUserCase.deleteUser(id);
  }
}
