import { Products as ProductsPrisma } from "@prisma/client";
import { ProductRepository } from "../repository/productRepository";
import { Product } from "../model/product";

export type ProductsCreationParams = Pick<
  Product,
  "title" | "description" | "file" | "quantity"
>;

export class ProductService {
  public async getById(id: number): Promise<ProductsPrisma | null> {
    const repository = new ProductRepository();
    return repository.getById(id);
  }

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

  public async update(params: ProductsPrisma): Promise<ProductsPrisma> {
    const repository = new ProductRepository();
    try {
      const response = await repository.update(params);
      return response;
    } catch (error) {
      console.log("error", error);
      return {} as ProductsPrisma;
    }
  }

  public async delete(id: number): Promise<ProductsPrisma> {
    const repository = new ProductRepository();
    try {
      const response = await repository.delete(id);
      return response;
    } catch (error) {
      console.log("error", error);
      return {} as ProductsPrisma;
    }
  }
}
