import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  car_id: string;
  expect_return_date: Date;
}

@injectable()
export default class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expect_return_date,
  }: IRequest): Promise<Rental> {
    const minHourToRent = 24;

    const carUnavailable = await this.rentalRepository.findOpenRentalByCarId(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Carro não disponível para locação");
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUserId(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("Usuário já possui aluguel em andamento");
    }

    const compare = this.dateProvider.compareDiffInHours(
      this.dateProvider.dateNow(),
      expect_return_date
    );

    if (compare < minHourToRent) {
      throw new AppError("O aluguel deve ter duração mínima de 24h");
    }

    const rental = await this.rentalRepository.create({
      car_id,
      user_id,
      expect_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}
