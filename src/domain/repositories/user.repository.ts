import { IUser } from "../entities";

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findByEmailAndPassword(email: string, password: string): Promise<IUser | null>;
  create(user: IUser): Promise<IUser>;
  update(id: string, updatedUser: IUser): Promise<IUser | null>;
  delete(id: string): Promise<boolean>;
}
