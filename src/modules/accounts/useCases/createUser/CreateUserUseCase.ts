import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../../../dtos/ICreateUserDTO";
import IUsersRepository from "../../repositories/IUsersRepository";

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const { name, password, driver_license, email, username } = data;

    await this.usersRepository.create({
      name,
      password,
      driver_license,
      email,
      username,
    });
  }
}
