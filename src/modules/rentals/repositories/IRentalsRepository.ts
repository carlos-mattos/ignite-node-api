import Rental from "../infra/typeorm/entities/Rental";

export default interface IRentalsRepository {
  findOpenRentalByCarId(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUserId(user_id: string): Promise<Rental | undefined>;
}
