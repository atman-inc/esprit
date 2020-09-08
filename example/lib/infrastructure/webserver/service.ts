import { container } from "tsyringe";
import { UserController } from "../../interface/controllers/userController";
import { FastifyRequest, FastifyReply } from "fastify";

class Service {
  async getUserList() {
    const controller = container.resolve(UserController);
    return controller.index();
  }

  async postUser(
    request: FastifyRequest<{
      Body: { name: string; email: string; password: string; birthday: Date };
    }>,
    reply: FastifyReply
  ) {
    const controller = container.resolve(UserController);
    const user = await controller.create(
      request.body.name,
      request.body.email,
      request.body.password,
      request.body.birthday
    );

    return { token: await reply.jwtSign({ sub: user.id }) };
  }

  async signin(
    request: FastifyRequest<{
      Body: { email: string; password: string };
    }>,
    reply: FastifyReply
  ) {
    const controller = container.resolve(UserController);
    const user = await controller.signin(
      request.body.email,
      request.body.password
    );

    return { token: await reply.jwtSign({ sub: user.id }) };
  }

  async getMe(request: FastifyRequest) {
    console.log(request.user);

    // TODO
    return {};
  }
}

module.exports = () => new Service();
