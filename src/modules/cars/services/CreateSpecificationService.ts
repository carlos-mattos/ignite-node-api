import ISpecificationsRepository from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Essa especificação já foi criada.");
    }

    this.specificationsRepository.create({ name, description });
  }
}
