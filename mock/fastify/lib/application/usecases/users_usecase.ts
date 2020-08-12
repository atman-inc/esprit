import { UsersRepository } from "../../infrastructure/repositories/users_repository";
import { injectable } from "tsyringe";
import { User } from "../../domain/user.entity";

@injectable()
export class UsersUsecase {
  constructor(private usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll()
  }

  async create(name: string, age: number): Promise<User> {
    return this.usersRepository.insert(name, age);
  }
}
