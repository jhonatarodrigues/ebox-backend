import { User } from "../model/user";
import { User as UserPrisma } from "@prisma/client";
import { UsersRepository } from "../repository/usersRepository";
import bcrypt from "bcrypt";

export type UserCreationParams = Pick<User, "email" | "name" | "password">;

export class UsersService {
  public async login(
    email: string,
    password: string
  ): Promise<UserPrisma | null> {
    const repository = new UsersRepository();

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await repository.findOne(email);

      if (!user) {
        return null;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return null;
      }

      const returnUser = {
        ...user,
        password: "",
      };

      return returnUser;
    } catch (error) {
      console.log("error", error);

      throw new Error("Error");
    }
  }

  public async create(
    userCreationParams: UserCreationParams
  ): Promise<UserPrisma> {
    const repository = new UsersRepository();

    try {
      const hashedPassword = await bcrypt.hash(userCreationParams.password, 10);
      const newUserCreationParams = {
        ...userCreationParams,
        password: hashedPassword,
      };

      const user = await repository.create(newUserCreationParams);

      const newReturn = {
        ...user,
        password: "",
      };

      return newReturn;
    } catch (error) {
      console.log("error", error);

      return {} as UserPrisma;
    }
  }
}
