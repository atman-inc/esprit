import { UserSigninInputData } from "./userSigninInputData";
import { UserCredential } from "../../../../domain/values/userCredential";

export interface UserSigninUsecase {
  handle(inputData: UserSigninInputData): Promise<UserCredential>;
}
