import { inject, injectable } from "tsyringe";
import IUsersRepository from "../../repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import AppError from "../../../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

// 1- usuario existe
// 2- senha correta
// 3- gerar o jwt

@injectable()
export default class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email ou senha incorretos");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new AppError("Email ou senha incorretos");
    }

    const token = sign({}, "4568902c4fe98c69c83f4e88a428964f", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
