import { User } from "../../../../domain/entiies/user";

export interface UserGetListUsecase {
  handle(): Promise<User[]>;
}
