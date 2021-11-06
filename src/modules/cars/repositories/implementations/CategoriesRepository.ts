import Category from "../../entities/Category";
import { ICreateCategoryDTO } from "../../../../dtos/CategoryDTO";
import ICategoriesRepository from "../ICategoriesRepository";
import { getRepository, Repository } from "typeorm";

export default class CategoriesRepository implements ICategoriesRepository {
  private static INSTANCE: CategoriesRepository;
  private repository: Repository<Category>;

  private constructor() {
    this.repository = getRepository(Category);
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });

    return category;
  }
}
