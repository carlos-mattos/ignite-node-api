import CategoriesRepository from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Já existe uma categoria com esse nome.");
    }

    this.categoriesRepository.create({ name, description });
  }
}
