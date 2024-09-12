import {
  Body,
  Controller,
  Post,
  Get,
  Route,
  Security,
  SuccessResponse,
  Delete,
  Path,
} from "tsoa";

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
  @Get()
  public async getUsers() {
    const user = new UsersService().getAll();

    return user;
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

  @Security("jwt", ["admin"])
  @Delete("/:id")
  public async delete(@Path() id: string): Promise<UserPrisma> {
    const user = new UsersService().delete(Number(id));

    return user;
  }
}
