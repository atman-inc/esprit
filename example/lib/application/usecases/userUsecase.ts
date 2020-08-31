import { UserRepository } from "../../domain/repositories/userRepository";
import { inject } from "tsyringe";
import { User } from "../../domain/entiies/user";

export class UserUsecase {
  constructor(
    @inject("userRepository") private readonly userRepository: UserRepository
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
