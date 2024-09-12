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
  Request,
} from "tsoa";
import { Products as ProductsPrisma } from "@prisma/client";
import express from "express";
import {
  ProductService,
  ProductsCreationParams,
} from "../services/productService";
import { receiveFile } from "../services/storageMulter";

@Route("product")
export class ProductsController extends Controller {
  @Get("/:id")
  public async getById(@Path() id: string): Promise<ProductsPrisma | null> {
    const response = new ProductService().getById(parseInt(id, 11));

    return response;
  }

  @Get("/")
  public async get(): Promise<ProductsPrisma[]> {
    const response = new ProductService().get();

    return response;
  }

  @SuccessResponse("201", "Created")
  @Security("jwt", ["admin"])
  @Post()
  public async create(
    @Request() request: express.Request
  ): Promise<ProductsPrisma> {
    const fileResponse = await receiveFile(request);

    const sendData = {
      ...request.body,
      file: fileResponse.filename,
    };

    const response = new ProductService().create(sendData);

    return response;
  }

  @Security("jwt", ["admin"])
  @Put()
  public async update(
    @Request() request: express.Request
  ): Promise<ProductsPrisma> {
    const fileResponse = await receiveFile(request);

    const sendData = {
      ...request.body,
      ...(fileResponse && fileResponse.filename
        ? { file: fileResponse.filename }
        : {}),
    };
    sendData.id = parseInt(String(sendData.id), 11);

    const response = new ProductService().update(sendData);

    return response;
  }

  @Security("jwt", ["admin"])
  @Delete("/:id")
  public async delete(@Path() id: string): Promise<ProductsPrisma> {
    const response = new ProductService().delete(Number(id));
    return response;
  }
}
