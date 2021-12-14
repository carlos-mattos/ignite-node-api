import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
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

@injectable()
export default class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(data: IRequest): Promise<void> {
    const {
      brand,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      category_id,
      name,
    } = data;

    this.carsRepository.create({
      brand,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      category_id,
      name,
    });
  }
}
