import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
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
  public async get(): Promise<ProductsPrisma[]> {
    const response = new ProductService().get();

    return response;
  }

  @SuccessResponse("201", "Created")
  @Security("jwt", ["admin"])
  @Post()
  public async create(
    @Body() requestBody: ProductsCreationParams
  ): Promise<ProductsPrisma> {
    const response = new ProductService().create(requestBody);

    return response;
  }

  @Security("jwt", ["admin"])
  @Put()
  public async update(
    @Body() requestBody: ProductsPrisma
  ): Promise<ProductsPrisma> {
    const response = new ProductService().update(requestBody);

    return response;
  }

  @Security("jwt", ["admin"])
  @Delete("/:id")
  public async delete(@Path() id: string): Promise<ProductsPrisma> {
    const response = new ProductService().delete(Number(id));
    return response;
  }
}
