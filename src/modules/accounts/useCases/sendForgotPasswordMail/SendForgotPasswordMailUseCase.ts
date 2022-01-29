import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUsersTokensRepository from "@modules/accounts/repositories/IUsersTokensRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import IMailProvider from "@shared/container/providers/MailProvider/IMailProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";
import path from "path";

@injectable()
export default class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = path.resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const token = uuid();

    await this.usersTokensRepository.create({
      refresh_token: token,
      expires_date: this.dateProvider.addHours(3),
      user_id: user.id,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}
