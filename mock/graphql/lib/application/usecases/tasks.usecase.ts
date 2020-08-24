import { injectable } from "tsyringe";
import { Task } from "../../domain/entities/task.entity";
import { TasksRepository } from "../../infrastructure/repositories/tasks.repository";
import { UsersRepository } from "../../infrastructure/repositories/users.repository";

@injectable()
export class TasksUsecase {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async findOne(id: string): Promise<Task | undefined> {
    return this.tasksRepository.findOne(id);
  }

  async create(user_id: string, title: string): Promise<Task> {
    const user = await this.usersRepository.findOne(user_id);
    const task = await this.tasksRepository.insert(user!, title);

    return task;
  }
}
