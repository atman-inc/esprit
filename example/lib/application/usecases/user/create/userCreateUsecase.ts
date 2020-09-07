import { UserCreateInputData } from "./userCreateInputData";
import { UserCredential } from "../../../../domain/values/userCredential";

export interface UserCreateUsecase {
  handle(inputData: UserCreateInputData): Promise<UserCredential>;
}
