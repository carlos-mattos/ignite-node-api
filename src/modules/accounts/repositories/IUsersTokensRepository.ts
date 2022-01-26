import { ICreateUsersTokensDTO } from "@dtos/ICreateUsersTokensDTO";
import UserTokens from "../infra/typeorm/entities/UserTokens";

export default interface IUsersTokensRepository {
  create(data: ICreateUsersTokensDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | undefined>;
  deleteById(id: string): Promise<void>;
}
