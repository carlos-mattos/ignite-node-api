import { ICreateCategoryDTO } from "../dtos/CategoryDTO";
import Category from "../model/Category";

export default interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}
