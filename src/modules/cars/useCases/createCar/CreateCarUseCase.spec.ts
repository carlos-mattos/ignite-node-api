import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateCarUseCase from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Fusca é um carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "5f4b8f8f-f9d6-4f0f-b8f8-f8f8f8f8f8f8",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not allow double register same license plate", async () => {
    await createCarUseCase.execute({
      name: "Fusca",
      description: "Fusca é um carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "5f4b8f8f-f9d6-4f0f-b8f8-f8f8f8f8f8f8",
    });

    await expect(
      createCarUseCase.execute({
        name: "Kombi",
        description: "Kombi é um carro de luxo",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "VW",
        category_id: "5f4b8f8f-f9d6-4f0f-b8f8-f9f9f9f9f9f9",
      })
    ).rejects.toEqual(new AppError("Este carro já está cadastrado"));
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Test",
      daily_rate: 100,
      license_plate: "ABC-1235",
      fine_amount: 10,
      brand: "VW",
      category_id: "Test",
    });

    expect(car).toHaveProperty("available", true);
  });
});
