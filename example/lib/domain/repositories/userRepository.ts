import { User } from "../entiies/user";

export interface UserRepository {
  findAll(): Promise<User[]>;
}
