import { prisma } from "./prismaRepository";
import { User as UserPrisma } from "@prisma/client";
import { User } from "../model/user";

export type UserCreationParams = Pick<User, "email" | "name" | "password">;
export type UserNoPassword = Pick<User, "email" | "name" | "status" | "id">;

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

  public getAll() {
    const result = prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        password: false,
      },
    });

    return result;
  }

  public delete(id: number): Promise<UserPrisma> {
    const result = prisma.user.delete({
      where: {
        id: Number(id),
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
