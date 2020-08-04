import { User } from "../../domain/user";

export class UsersRepository {
  constructor() {}

  findAll(): User[] {
    return [new User("Taro", 18), new User("Hanako", 24)];
  }

  insert(name: string, age: number): User {
    return new User(name, age);
  }
}
