import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import UsersTokensRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import MailProviderInMemory from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import AppError from "@shared/errors/AppError";
import SendForgotPasswordMailUseCase from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Password Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send forgot password mail", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "349110",
      email: "po@ce.ag",
      name: "Poce",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("po@ce.ag");

    expect(sendMail).toBeCalled();
  });

  it("should not send email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("fav@meiru.am")
    ).rejects.toEqual(new AppError("Usuário não encontrado"));
  });

  it("should be able to create an user token", async () => {
    const createTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "384011",
      email: "fu@gerlawte.by",
      name: "Katie Olson",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("fu@gerlawte.by");

    expect(createTokenMail).toBeCalled();
  });
});
