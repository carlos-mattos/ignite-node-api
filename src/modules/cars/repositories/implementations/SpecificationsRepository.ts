import { ISpecificationDTO } from "../../../../dtos/SpecificationDTO";
import Specification from "../../entities/Specification";
import ISpecificationsRepository from "../ISpecificationsRepository";

export default class SpecificationsRepository
  implements ISpecificationsRepository
{
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ISpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (spec) => spec.name === name
    );

    return specification;
  }
}
