import { IUser } from "../../domain/entities";

export interface IUserService {
  findAll(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null>;
  create(user: IUser): Promise<IUser>;
  update(id: string, updatedUser: IUser): Promise<IUser | null>;
  delete(id: string): Promise<boolean>;
}
