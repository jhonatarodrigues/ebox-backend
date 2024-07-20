import { prisma } from "./prismaRepository";
import { Products as ProductsPrisma } from "@prisma/client";
import { ProductsCreationParams } from "../services/productService";

export class ProductRepository {
  public get(): Promise<ProductsPrisma[]> {
    const result = prisma.products.findMany();

    return result;
  }

  public create(
    productCreationParams: ProductsCreationParams
  ): Promise<ProductsPrisma> {
    const result = prisma.products.create({
      data: {
        title: productCreationParams.title as string,
        description: productCreationParams.description as string,
      },
    });

    return result;
  }
}
