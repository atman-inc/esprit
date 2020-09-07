import { UserCreateInputData } from "./userCreateInputData";

export interface UserCreateUsecase {
  handle(inputData: UserCreateInputData): Promise<void>;
}
