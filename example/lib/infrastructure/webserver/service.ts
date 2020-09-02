import { container } from "tsyringe";
import { UserController } from "../../interface/controllers/userController";

class Service {
  async getUserList() {
    const controller = container.resolve(UserController);
    return controller.index();
  }
}

module.exports = () => new Service();
