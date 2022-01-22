import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateRentalUseCase from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "12345",
      expect_return_date: new Date(),
      user_id: "12345",
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not create a new rental when user already already has one ", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "11111",
        expect_return_date: new Date(),
        user_id: "12345",
      });

      await createRentalUseCase.execute({
        car_id: "22222",
        expect_return_date: new Date(),
        user_id: "12345",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not create a new rental when car is unavailable", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "12345",
        expect_return_date: new Date(),
        user_id: "11111",
      });

      await createRentalUseCase.execute({
        car_id: "12345",
        expect_return_date: new Date(),
        user_id: "22222",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
