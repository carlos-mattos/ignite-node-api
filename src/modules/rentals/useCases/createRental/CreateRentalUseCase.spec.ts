import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateRentalUseCase from "./CreateRentalUseCase";
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;

describe("Create Rental", () => {
  let dayAdd24Hours = null;

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider
    );

    dayAdd24Hours = dayjsProvider.add24Hours();
  });

  it("should create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "12345",
      expect_return_date: dayAdd24Hours,
      user_id: "12345",
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not create a new rental when user already already has one ", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "11111",
        expect_return_date: dayAdd24Hours,
        user_id: "12345",
      });

      await createRentalUseCase.execute({
        car_id: "22222",
        expect_return_date: dayAdd24Hours,
        user_id: "12345",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not create a new rental when car is unavailable", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "12345",
        expect_return_date: dayAdd24Hours,
        user_id: "11111",
      });

      await createRentalUseCase.execute({
        car_id: "12345",
        expect_return_date: dayAdd24Hours,
        user_id: "22222",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not create a new rental with invalid return", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "12345",
        expect_return_date: new Date(),
        user_id: "11111",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
