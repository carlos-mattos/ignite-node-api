import { ICreateCarDTO } from "@dtos/ICreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "../ICarsRepository";

export default class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<void> {
    const {
      brand,
      name,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    } = data;

    const car = new Car();

    Object.assign(car, {
      brand,
      name,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });

    this.cars.push(car);
  }
}
