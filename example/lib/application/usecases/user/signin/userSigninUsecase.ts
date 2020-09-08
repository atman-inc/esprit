import { UserSigninInputData } from "./userSigninInputData";
import { User } from "../../../../domain/entiies/user";

export interface UserSigninUsecase {
  handle(inputData: UserSigninInputData): Promise<User>;
}
