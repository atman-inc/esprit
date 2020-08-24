import { UsersRepository } from "../../infrastructure/repositories/users.repository";
import { injectable } from "tsyringe";
import { User } from "../../domain/entities/user.entity";

@injectable()
export class UsersUsecase {
    constructor(private readonly repository: UsersRepository) {}

    async findAll(): Promise<User[]> {
        return this.repository.findAll()
    }

    async findOne(id: string): Promise<User | undefined> {
        return this.repository.findOne(id)
    }

    async create(name: string, age: number): Promise<User> {
        return this.repository.insert(name, age)
    }
}
