import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export default class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ user_id, id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError("Esse aluguel não existe ou não foi encontrado");
    }

    let daily = this.dateProvider.compareDiffInDays(
      rental.expect_return_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = 1; // minimo de uma diaria
    }

    const compare = this.dateProvider.compareDiffInDays(
      this.dateProvider.dateNow(),
      rental.expect_return_date
    );

    let total = 0;

    if (compare > 0) {
      const calculateFine = compare * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
