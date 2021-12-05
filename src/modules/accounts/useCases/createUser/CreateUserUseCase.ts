import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@dtos/ICreateUserDTO";

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const { name, password, driver_license, email } = data;

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("Email já registrado");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: passwordHash,
      driver_license,
      email,
    });
  }
}
