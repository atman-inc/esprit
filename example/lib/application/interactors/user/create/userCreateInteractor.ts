import { injectable, inject } from "tsyringe";
import { UserCreateUsecase } from "../../../usecases/user/create/userCreateUsecase";
import { UserRepository } from "../../../../domain/repositories/userRepository";
import { UserCreateInputData } from "../../../usecases/user/create/userCreateInputData";
import { User } from "../../../../domain/entiies/user";
import bcyrpt from "bcrypt";

@injectable()
export class UserCreateInteractor implements UserCreateUsecase {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  async handle(inputData: UserCreateInputData): Promise<User> {
    const duplicateUser = await this.userRepository.findByEmail(
      inputData.email
    );
    if (duplicateUser) {
      throw new Error("duplicated user");
    }

    const encrypted_password = await bcyrpt.hash(inputData.password, 10);
    const user = await this.userRepository.insert(
      new User(
        null,
        inputData.name,
        inputData.email,
        encrypted_password,
        inputData.birthday
      )
    );

    return user;
  }
}
