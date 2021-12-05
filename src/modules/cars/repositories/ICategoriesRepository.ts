import { ICreateCategoryDTO } from "@dtos/ICreateCategoryDTO";
import Category from "@modules/cars/infra/typeorm/entities/Category";

export default interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}
