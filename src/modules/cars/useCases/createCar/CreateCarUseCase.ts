import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

// @injectable()
export default class CreateCarUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(data: IRequest): Promise<Car> {
    const {
      brand,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      category_id,
      name,
    } = data;

    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Este carro já está cadastrado");
    }

    const car = this.carsRepository.create({
      brand,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      category_id,
      name,
    });

    return car;
  }
}
