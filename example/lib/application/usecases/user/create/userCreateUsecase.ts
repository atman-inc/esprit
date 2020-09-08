import { UserCreateInputData } from "./userCreateInputData";
import { User } from "../../../../domain/entiies/user";

export interface UserCreateUsecase {
  handle(inputData: UserCreateInputData): Promise<User>;
}
