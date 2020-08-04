import { UsersRepository } from "../../infrastructure/repositories/users_repository";
import { injectable } from "tsyringe";
import { User } from "../../domain/user";

@injectable()
export class UsersUsecase {
  constructor(private usersRepository: UsersRepository) {}

  findAll(): User[] {
    return this.usersRepository.findAll();
  }
}
