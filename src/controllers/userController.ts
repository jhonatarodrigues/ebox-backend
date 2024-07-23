import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { User } from "../model/user";
import { User as UserPrisma } from "@prisma/client";
import { UsersService, UserCreationParams } from "../services/usersService";

@Route("users")
export class UsersController extends Controller {
  @Get("/login")
  public async getLoginUser(
    @Query() email: string,
    @Query() password: string
  ): Promise<UserPrisma | null> {
    const response = new UsersService().login(email, password);

    console.log("requestBody", email, password);

    return response;
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<UserPrisma> {
    const user = new UsersService().create(requestBody);

    return user;
  }
}
