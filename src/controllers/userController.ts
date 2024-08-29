import { Body, Controller, Post, Route, Security, SuccessResponse } from "tsoa";

import { User as UserPrisma } from "@prisma/client";
import { UsersService, UserCreationParams } from "../services/usersService";
import { generateToken } from "../utils/jwt";

@Route("users")
export class UsersController extends Controller {
  @Post("/login")
  public async loginUser(
    @Body() requestBody: { email: string; password: string }
  ): Promise<{ token: string; name: string } | null> {
    const response = await new UsersService().login(
      requestBody.email,
      requestBody.password
    );

    if (!response) {
      return null;
    }

    const token = generateToken(response);

    return { token, name: response.name };
  }

  @SuccessResponse("201", "Created")
  @Security("jwt", ["admin"])
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<UserPrisma> {
    const user = new UsersService().create(requestBody);

    return user;
  }
}
