import { injectable, inject } from "tsyringe";
import { UserRepository } from "../../../../domain/repositories/userRepository";
import { UserSigninUsecase } from "../../../usecases/user/signin/userSigninUsecase";
import { UserSigninInputData } from "../../../usecases/user/signin/userSigninInputData";
import { UserCredential } from "../../../../domain/values/userCredential";
import bcrypt from "bcrypt";

@injectable()
export class UserSigninInteractor implements UserSigninUsecase {
  constructor(
    @inject("userRepository") private readonly userRepository: UserRepository
  ) {}

  async handle(inputData: UserSigninInputData): Promise<UserCredential> {
    const user = await this.userRepository.findByEmail(inputData.email);
    if (!user) {
      throw new Error("does not exist user");
    }

    const matchedPassword = await bcrypt.compare(
      inputData.password,
      user.encrypted_password
    );
    if (!matchedPassword) {
      throw new Error("invalid password");
    }

    return new UserCredential(user);
  }
}
