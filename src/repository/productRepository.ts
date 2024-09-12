import { prisma } from "./prismaRepository";
import { Products as ProductsPrisma } from "@prisma/client";
import { ProductsCreationParams } from "../services/productService";

export class ProductRepository {
  public getById(id: number): Promise<ProductsPrisma | null> {
    const result = prisma.products.findFirst({
      where: {
        id: id,
      },
    });

    return result;
  }
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
        ...productCreationParams,
      },
      where: {
        id: parseInt(String(productCreationParams.id), 11),
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
