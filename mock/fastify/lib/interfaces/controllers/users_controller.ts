import { FastifyRequest, FastifyReply } from "fastify";
import { injectable } from "tsyringe";
import { UsersUsecase } from "../../application/usecases/users_usecase";
import { IUserCreateParameter } from "../../domain/user.entity";

@injectable()
export class UsersController {
  constructor(private usersUsecase: UsersUsecase) {}

  async index(request: FastifyRequest, reply: FastifyReply) {
    const users = await this.usersUsecase.findAll()
    reply.send(users);
  }

  async create(
    request: FastifyRequest<{ Body: IUserCreateParameter }>,
    reply: FastifyReply
  ) {
    const { name, age } = request.body;
    const user = await this.usersUsecase.create(name, age)
    reply.send(user);
  }
}
