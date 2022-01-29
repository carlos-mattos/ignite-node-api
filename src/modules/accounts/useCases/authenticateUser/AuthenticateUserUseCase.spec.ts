import { ICreateUserDTO } from "@dtos/ICreateUserDTO";
import AppError from "@shared/errors/AppError";
import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import CreateUserUseCase from "../createUser/CreateUserUseCase";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";
import UsersTokensRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
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
    await expect(
      authenticateUserUseCase.execute({
        email: "false@false.com.br",
        password: "false",
      })
    ).rejects.toEqual(new AppError("Email ou senha incorretos"));
  });

  it("Should not authenticate a user with wrong password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "123456789",
      email: "teste2@teste2.com.br",
      name: "Teste2",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "false",
      })
    ).rejects.toEqual(new AppError("Email ou senha incorretos"));
  });
});
