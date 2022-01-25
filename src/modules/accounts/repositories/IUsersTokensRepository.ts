import { ICreateUsersTokensDTO } from "@dtos/ICreateUsersTokensDTO";
import UserTokens from "../infra/typeorm/entities/UserTokens";

export default interface IUsersTokensRepository {
  create(data: ICreateUsersTokensDTO): Promise<UserTokens>;
}
