import { UserUsecase } from "../../application/usecases/userUsecase";
import { FastifyRequest, FastifyReply } from "fastify";

export class UserController {
  constructor(private readonly userUsecase: UserUsecase) {}

  async index(_: FastifyRequest, reply: FastifyReply) {
    const users = await this.userUsecase.findAll();
    reply.send(users);
  }
}
