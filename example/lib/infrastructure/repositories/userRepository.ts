import { Repository } from "typeorm";
import { User as ORMUser } from "../orm/entities/user";
import { User } from "../../domain/entiies/user";
import { UserRepository as UserRepositoryInterface } from "../../domain/repositories/userRepository";

export class UserRepository implements UserRepositoryInterface {
  constructor(private db: Repository<ORMUser>) {}

  async findAll(): Promise<User[]> {
    const dbUsers = await this.db.find();
    return dbUsers.map((u) => {
      return this.cloneUser(u);
    });
  }

  async insert(user: User): Promise<User> {
    const ormUser = new ORMUser();
    ormUser.name = user.name;
    ormUser.email = user.email;
    ormUser.birthday = user.birthday;
    ormUser.icon = "";

    await this.db.save(ormUser);

    return this.cloneUser(ormUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const dbUser = await this.db.findOne({ where: { email: email } });

    return dbUser ? this.cloneUser(dbUser) : undefined;
  }

  private cloneUser(ormUser: ORMUser): User {
    return new User(
      ormUser.id,
      ormUser.name,
      ormUser.email,
      ormUser.birthday,
      ormUser.icon || null,
      ormUser.createdAt,
      ormUser.updatedAt
    );
  }
}
