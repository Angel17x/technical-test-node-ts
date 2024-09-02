import { IUser } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories";
import { User } from "../../domain/schemas";

export class UserRepositoryImpl implements IUserRepository {
  findByEmailAndPassword(email: string, password: string): Promise<IUser | null> {
    return User.findOne({ email: email, password: password }).lean();
  }
  findAll(): Promise<IUser[]> {
    return User.find().lean();
  }
  findById(id: string): Promise<IUser | null> {
    return User.findById(id).lean();
  }
  findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).lean();
  }
  async create(user: IUser): Promise<IUser> {
    const userCreated = new User(user);
    await userCreated.save();
    return userCreated;
  }
  async update(id: string, updatedUser: IUser): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    }).lean();
    return user;
  }
  async delete(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id).lean();
    return result != null;
  }
}
