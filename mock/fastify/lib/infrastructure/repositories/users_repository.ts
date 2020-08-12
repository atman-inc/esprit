import { User } from "../../domain/user.entity";
import { injectable, inject } from "tsyringe";
import { Repository } from "typeorm";

@injectable()
export class UsersRepository {
  constructor(@inject('usersDB') private readonly db: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.db.find()
  }

  async insert(name: string, age: number): Promise<User> {
    const user = new User()
    user.name = name
    user.age = age

    return this.db.save(user)
  }
}
