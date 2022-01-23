import AppError from "@shared/errors/AppError";
import CategoriesRepositoryInMemory from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category 1",
      description: "Description 1",
    };

    await createCategoryUseCase.execute(category);

    const response = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(response).toHaveProperty("id");
  });

  it("Should NOT be able to create a new category when already exists another with same name", async () => {
    const category = {
      name: "Category 1",
      description: "Description 1",
    };

    await createCategoryUseCase.execute(category);

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError("Já existe uma categoria com esse nome.")
    );
  });
});
