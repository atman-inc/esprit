import { User } from "../entiies/user";

export interface UserRepository {
  findAll(): Promise<User[]>;
  insert(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
