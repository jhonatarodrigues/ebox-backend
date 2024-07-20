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
import { Products as ProductsPrisma } from "@prisma/client";
import {
  ProductService,
  ProductsCreationParams,
} from "../services/productService";

@Route("product")
export class ProductsController extends Controller {
  @Get("/")
  public async getUser(): Promise<ProductsPrisma[]> {
    const response = new ProductService().get();

    return response;
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(
    @Body() requestBody: ProductsCreationParams
  ): Promise<ProductsPrisma> {
    const response = new ProductService().create(requestBody);

    return response;
  }
}
