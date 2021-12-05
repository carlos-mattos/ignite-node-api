import { ICreateUserDTO } from "src/dtos/ICreateUserDTO";
import AppError from "../../../../errors/AppError";
import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import CreateUserUseCase from "../createUser/CreateUserUseCase";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("Should authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "123456789",
      email: "teste@teste.com.br",
      name: "Teste",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty("token");
  });

  it("Should not authenticate a non-existent user", async () => {
    expect(async () => {
      const response = await authenticateUserUseCase.execute({
        email: "false@false.com.br",
        password: "false",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not authenticate a user with wrong password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "123456789",
        email: "teste2@teste2.com.br",
        name: "Teste2",
        password: "123456",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "false",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
