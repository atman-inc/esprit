import { FastifyRequest, FastifyReply } from "fastify";
import { injectable } from "tsyringe";
import { UsersUsecase } from "../../application/usecases/users_usecase";
import { IUserCreateParameter } from "../../domain/user";

@injectable()
export class UsersController {
  constructor(private usersUsecase: UsersUsecase) {}

  async index(request: FastifyRequest, reply: FastifyReply) {
    reply.send(this.usersUsecase.findAll());
  }

  async create(
    request: FastifyRequest<{ Body: IUserCreateParameter }>,
    reply: FastifyReply
  ) {
    const { name, age } = request.body;
    reply.send(this.usersUsecase.create(name, age));
  }
}
