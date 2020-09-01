import { UserGetListUsecase } from "../../../usecases/user/list/userGetListUsecase";
import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../../../domain/repositories/userRepository";

@injectable()
export class UserGetListInteractor implements UserGetListUsecase {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  async handle() {
    return this.userRepository.findAll();
  }
}
