import { injectable, inject } from 'tsyringe'
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';

@injectable()
export class UsersRepository {
    constructor(@inject('usersDB') private readonly db: Repository<User>) {}

    async findAll(): Promise<User[]> {
        return this.db.find()
    }

    async findOne(id: string): Promise<User | undefined> {
        return this.db.findOne(id)
    }

    async insert(name: string, age: number): Promise<User> {
        const user = new User()
        user.name = name
        user.age = age

        return this.db.save(user)
    }
} 
