import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateRentalUseCase from "./CreateRentalUseCase";
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  let dayAdd24Hours = null;

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider,
      carsRepositoryInMemory
    );

    dayAdd24Hours = dayjsProvider.add24Hours();
  });

  it("should create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Fiat",
      category_id: "1",
      daily_rate: 100,
      description: "Fiat Uno",
      fine_amount: 10,
      license_plate: "ABC1234",
      name: "Fiat Uno",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      expect_return_date: dayAdd24Hours,
      user_id: "12345",
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not create a new rental when user already already has one ", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1",
      expect_return_date: dayAdd24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "2",
        expect_return_date: dayAdd24Hours,
        user_id: "12345",
      })
    ).rejects.toEqual(new AppError("Usuário já possui aluguel em andamento"));
  });

  it("should not create a new rental when car is unavailable", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1",
      expect_return_date: dayAdd24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "1",
        expect_return_date: dayAdd24Hours,
        user_id: "22222",
      })
    ).rejects.toEqual(new AppError("Carro não disponível para locação"));
  });

  it("should not create a new rental with invalid return", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "12345",
        expect_return_date: new Date(),
        user_id: "11111",
      })
    ).rejects.toEqual(new AppError("O aluguel deve ter duração mínima de 24h"));
  });
});
