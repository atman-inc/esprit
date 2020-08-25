import { injectable, inject } from "tsyringe";
import { User } from "../../domain/entities/users_entity";
import { DynamoStore } from "@shiftcoders/dynamo-easy";

@injectable()
export class UsersRepository {
  constructor(
    @inject("usersStore") private readonly store: DynamoStore<User>
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.store.scan().exec();

    return users;
  }
}
