import { container } from "tsyringe";
import { UserController } from "../../interface/controllers/userController";
import { FastifyRequest } from "fastify";

class Service {
  async getUserList() {
    const controller = container.resolve(UserController);
    return controller.index();
  }

  async postUser(
    request: FastifyRequest<{
      Body: { name: string; email: string; password: string; birthday: Date };
    }>
  ) {
    const controller = container.resolve(UserController);
    return controller.create(
      request.body.name,
      request.body.email,
      request.body.password,
      request.body.birthday
    );
  }
}

module.exports = () => new Service();
