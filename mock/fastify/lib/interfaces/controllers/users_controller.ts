import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";
import { UsersUsecase } from "../../application/usecases/users_usecase";
import { IUserCreateParameter } from "../../domain/user";

export class UsersController {
  static async index(request: FastifyRequest, reply: FastifyReply) {
    const usecase = container.resolve(UsersUsecase);
    reply.send(usecase.findAll());
  }

  static async create(
    request: FastifyRequest<{ Body: IUserCreateParameter }>,
    reply: FastifyReply
  ) {
    const usecase = container.resolve(UsersUsecase);
    const { name, age } = request.body;
    reply.send(usecase.create(name, age));
  }
}
