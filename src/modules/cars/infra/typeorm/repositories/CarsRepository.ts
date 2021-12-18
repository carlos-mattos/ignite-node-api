import { ICreateCarDTO } from "@dtos/ICreateCarDTO";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import Car from "../entities/Car";

export default class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = data;

    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
      const car = await this.repository.findOne({
          license_plate
      })

      return car
  }
}
