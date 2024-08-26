import { IUser } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories";
import { User } from "../../domain/schemas";

export class UserRepositoryImpl implements IUserRepository {
  findAll(): Promise<IUser[]> {
    return User.find().exec();
  }
  findById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();
  }
  async create(user: IUser): Promise<IUser> {
    const userCreated = new User(user);
    await userCreated.save();
    return userCreated;
  }
  async update(id: string, updatedUser: IUser): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    }).exec();
    return user;
  }
  async delete(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id).exec();
    return result != null;
  }
}
