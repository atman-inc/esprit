import { User } from "../entiies/user";

export interface UserRepository {
  findAll(): Promise<User[]>;
  findByID(id: number): Promise<User>;
  insert(name: string): Promise<User>;
}
