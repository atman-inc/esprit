import { injectable } from "tsyringe";
import { User } from "../../domain/entities/users_entity";

@injectable()
export class UsersRepository {
  findAll(): User[] {
    const user1 = new User();
    user1.id = 1;
    user1.name = "Taro";
    user1.age = 18;

    return [user1];
  }
}
