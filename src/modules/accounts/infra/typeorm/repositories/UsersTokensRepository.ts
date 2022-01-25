import { ICreateUsersTokensDTO } from "@dtos/ICreateUsersTokensDTO";
import IUsersTokensRepository from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import UserTokens from "../entities/UserTokens";

export default class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUsersTokensDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}
