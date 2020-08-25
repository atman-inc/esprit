import { injectable } from "tsyringe";
import { UsersRepository } from "../../infrustructure/repositories/users_repository";
import { User } from "../../domain/entities/users_entity";

@injectable()
export class UsersUsecase {
  constructor(private readonly repository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async create(name: string, age: number): Promise<User> {
    return this.repository.insert(name, age);
  }
}
