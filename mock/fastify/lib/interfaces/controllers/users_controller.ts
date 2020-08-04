import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";
import { UsersUsecase } from "../../application/usecases/users_usecase";

export class UsersController {
  static async index(request: FastifyRequest, reply: FastifyReply) {
    const usecase = container.resolve(UsersUsecase);
    reply.send(usecase.findAll());
  }
}
