import { injectable, inject } from "tsyringe";
import { UserGetListUsecase } from "../../application/usecases/user/list/userGetListUsecase";
import { UserCreateInputData } from "../../application/usecases/user/create/userCreateInputData";
import { UserCreateUsecase } from "../../application/usecases/user/create/userCreateUsecase";

@injectable()
export class UserController {
  constructor(
    @inject("UserGetListUsecase")
    private readonly getListUsecase: UserGetListUsecase,
    @inject("UserCreateUsecase")
    private readonly createUsecase: UserCreateUsecase
  ) {}

  async index() {
    const users = await this.getListUsecase.handle();

    return users;
  }

  async create(name: string, email: string, password: string, birthday: Date) {
    const inputData = new UserCreateInputData(name, email, password, birthday);

    return await this.createUsecase.handle(inputData);
  }
}
