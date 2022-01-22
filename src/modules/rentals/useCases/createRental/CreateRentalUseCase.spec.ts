import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateRentalUseCase from "./CreateRentalUseCase";
import dayjs from "dayjs";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(24, "hours").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
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
        expect_return_date: dayjs().toDate(),
        user_id: "11111",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
