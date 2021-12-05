import { ICreateSpecificationDTO } from "@dtos/ICreateSpecificationDTO";
import Specification from "@modules/cars/infra/typeorm/entities/Specification";

export default interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}
