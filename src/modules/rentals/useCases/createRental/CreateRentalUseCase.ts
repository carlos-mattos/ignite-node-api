import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import AppError from "@shared/errors/AppError";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expect_return_date: Date;
}

export default class CreateRentalUseCase {
  constructor(private rentalRepository: IRentalsRepository) {}

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

    const expectReturnDateFormatted = dayjs(expect_return_date)
      .utc()
      .local()
      .format();
    const dateNowFormatted = dayjs().utc().local().format();
    const compare = dayjs(expectReturnDateFormatted).diff(
      dateNowFormatted,
      "hours"
    );

    if (compare < minHourToRent) {
      throw new AppError("O aluguel deve ter duração mínima de 24h");
    }

    const rental = await this.rentalRepository.create({
      car_id,
      user_id,
      expect_return_date,
    });

    return rental;
  }
}
