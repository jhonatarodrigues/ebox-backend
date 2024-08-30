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
        quantity: productCreationParams.quantity as string,
        file: productCreationParams.file as string,
      },
    });

    return result;
  }

  public update(
    productCreationParams: ProductsPrisma
  ): Promise<ProductsPrisma> {
    const result = prisma.products.update({
      data: {
        title: productCreationParams.title as string,
        description: productCreationParams.description as string,
      },
      where: {
        id: productCreationParams.id as number,
      },
    });

    return result;
  }

  public delete(id: number): Promise<ProductsPrisma> {
    const result = prisma.products.delete({
      where: {
        id: Number(id),
      },
    });

    return result;
  }
}
