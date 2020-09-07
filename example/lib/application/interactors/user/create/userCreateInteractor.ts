import { injectable, inject } from "tsyringe";
import { UserCreateUsecase } from "../../../usecases/user/create/userCreateUsecase";
import { UserRepository } from "../../../../domain/repositories/userRepository";
import { UserCreateInputData } from "../../../usecases/user/create/userCreateInputData";
import { User } from "../../../../domain/entiies/user";
import { UserCredential } from "../../../../domain/values/userCredential";

@injectable()
export class UserCreateInteractor implements UserCreateUsecase {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  async handle(inputData: UserCreateInputData): Promise<UserCredential> {
    const duplicateUser = this.userRepository.findByEmail(inputData.email);
    if (duplicateUser) {
      throw new Error("duplicated user");
    }

    const user = await this.userRepository.insert(
      new User(null, inputData.name, inputData.email, inputData.birthday)
    );

    return new UserCredential(user);
  }
}
