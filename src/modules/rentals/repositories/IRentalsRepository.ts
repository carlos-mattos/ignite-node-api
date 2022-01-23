import { ICreateRentalDTO } from "@dtos/ICreateRentalDTO";
import Rental from "../infra/typeorm/entities/Rental";

export default interface IRentalsRepository {
  findOpenRentalByCarId(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUserId(user_id: string): Promise<Rental | undefined>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental | undefined>;
}
