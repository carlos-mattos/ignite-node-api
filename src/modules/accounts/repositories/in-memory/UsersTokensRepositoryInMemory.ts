import { ICreateUsersTokensDTO } from "@dtos/ICreateUsersTokensDTO";
import UserTokens from "@modules/accounts/infra/typeorm/entities/UserTokens";
import IUsersTokensRepository from "../IUsersTokensRepository";

export default class UsersTokensRepositoryInMemory
  implements IUsersTokensRepository
{
  userTokens: UserTokens[] = [];

  async create(data: ICreateUsersTokensDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, data);

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.userTokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.userTokens.splice(userTokenIndex, 1);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userToken;
  }
}
