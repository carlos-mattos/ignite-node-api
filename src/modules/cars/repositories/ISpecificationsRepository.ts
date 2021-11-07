import { ISpecificationDTO } from "../../../dtos/SpecificationDTO";
import Specification from "../entities/Specification";

export default interface ISpecificationsRepository {
  create({ name, description }: ISpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}
