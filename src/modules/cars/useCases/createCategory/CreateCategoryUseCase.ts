import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Já existe uma categoria com esse nome.");
    }

    this.categoriesRepository.create({ name, description });
  }
}
