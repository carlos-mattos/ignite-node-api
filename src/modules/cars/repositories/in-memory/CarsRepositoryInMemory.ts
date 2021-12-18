import { ICreateCarDTO } from "@dtos/ICreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "../ICarsRepository";

export default class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
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

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.license_plate == licensePlate);

    return car;
  }

  async findAll(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    return this.cars.filter(
      (car) =>
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
    );
  }
}
