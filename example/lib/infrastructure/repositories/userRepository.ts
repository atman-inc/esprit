import { Repository } from "typeorm";
import { User as ORMUser } from "../orm/entities/user";
import { User } from "../../domain/entiies/user";
import { UserRepository as UserRepositoryInterface } from "../../domain/repositories/userRepository";

export class UserRepository implements UserRepositoryInterface {
  constructor(private db: Repository<ORMUser>) {}

  async findAll(): Promise<User[]> {
    const dbUsers = await this.db.find();
    return dbUsers.map((u) => {
      return new User(u.id, u.name);
    });
  }
}
