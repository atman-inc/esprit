import { injectable } from "tsyringe";
import { UsersRepository } from "../../infrustructure/repositories/users_repository";
import { User } from "../../domain/entities/users_entity";

@injectable()
export class UsersUsecase {
  constructor(private readonly repository: UsersRepository) {}

  findAll(): User[] {
    return this.repository.findAll();
  }
}
