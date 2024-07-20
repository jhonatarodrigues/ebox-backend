import { User } from "../model/user";
import { User as UserPrisma } from "@prisma/client";
import { UsersRepository } from "../repository/usersRepository";

export type UserCreationParams = Pick<User, "email" | "name" | "password">;

export class UsersService {
  public get(id: number, name?: string): User {
    return {} as User;
  }

  public async create(
    userCreationParams: UserCreationParams
  ): Promise<UserPrisma> {
    const repository = new UsersRepository();

    try {
      const user = await repository.create(userCreationParams);

      return user;
    } catch (error) {
      console.log("error", error);

      return {} as UserPrisma;
    }
  }
}
