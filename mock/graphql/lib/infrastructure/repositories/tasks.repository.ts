import { injectable, inject } from 'tsyringe'
import { Repository } from 'typeorm';
import { Task } from '../../domain/entities/task.entity';
import { User } from '../../domain/entities/user.entity';

@injectable()
export class TasksRepository {
    constructor(@inject('tasksDB') private readonly db: Repository<Task>) {}

    async findAll(): Promise<Task[]> {
        return this.db.find()
    }

    async findOne(id: string): Promise<Task | undefined> {
        return this.db.findOne(id)
    }

    async insert(user: User, title: string): Promise<Task> {
        const task = new Task()
        task.title = title
        task.user = user

        return this.db.save(task)
    }
} 
