import { ICreateRentalDTO } from "@dtos/ICreateRentalDTO";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import Rental from "../entities/Rental";

export default class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: { car_id, end_date: null },
    });
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: { user_id, end_date: null },
    });
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const { car_id, user_id, expect_return_date, id, end_date, total } = data;

    const rental = this.repository.create({
      car_id,
      expect_return_date,
      user_id,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental | undefined> {
    return await this.repository.findOne(id);
  }

  async findRentalsByUser(user_id: string): Promise<Rental[]> {
    return await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });
  }
}
