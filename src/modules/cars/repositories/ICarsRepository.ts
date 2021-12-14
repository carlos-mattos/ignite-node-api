import { ICreateCarDTO } from "@dtos/ICreateCarDTO";

export default interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
}
