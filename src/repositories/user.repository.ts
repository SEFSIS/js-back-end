import { User } from "../models/User";
import { IUser } from "../types/user.type";

class UserRepository {
  public async create(data: IUser): Promise<IUser> {
    return User.create(data);
  }
}

export const userRepository = new UserRepository();
