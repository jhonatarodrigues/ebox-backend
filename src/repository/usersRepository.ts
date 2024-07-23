import { prisma } from "./prismaRepository";
import { User as UserPrisma } from "@prisma/client";
import { User } from "../model/user";

export type UserCreationParams = Pick<User, "email" | "name" | "password">;

export class UsersRepository {
  public create(userCreationParams: UserCreationParams): Promise<UserPrisma> {
    const result = prisma.user.create({
      data: {
        ...userCreationParams,
        status: 1,
      },
    });

    return result;
  }

  public findOne(email: string): Promise<UserPrisma | null> {
    const result = prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return result;
  }
}
