import { Products as ProductsPrisma } from "@prisma/client";
import { ProductRepository } from "../repository/productRepository";
import { Product } from "../model/product";

export type ProductsCreationParams = Pick<Product, "title" | "description">;

export class ProductService {
  public async get(): Promise<ProductsPrisma[]> {
    const repository = new ProductRepository();
    return repository.get();
  }

  public async create(
    creationParams: ProductsCreationParams
  ): Promise<ProductsPrisma> {
    const repository = new ProductRepository();
    try {
      const response = await repository.create(creationParams);
      return response;
    } catch (error) {
      console.log("error", error);
      return {} as ProductsPrisma;
    }
  }
}
