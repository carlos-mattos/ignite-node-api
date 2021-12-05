import { ICreateUserDTO } from "src/dtos/ICreateUserDTO";
import User from "../../entities/User";
import IUsersRepository from "../IUsersRepository";

export default class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license: data.driver_license,
      name: data.name,
      email: data.email,
      password: data.password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
