import { injectable, inject } from "tsyringe";
import { UserGetListUsecase } from "../../application/usecases/user/list/userGetListUsecase";

@injectable()
export class UserController {
  constructor(
    @inject("UserGetListUsecase")
    private readonly getListUsecase: UserGetListUsecase
  ) {}

  async index() {
    const users = await this.getListUsecase.handle();

    return users;
  }
}
