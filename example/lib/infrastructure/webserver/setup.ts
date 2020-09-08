import { createConnection } from "typeorm";
import { container } from "tsyringe";
import { UserGetListInteractor } from "../../application/interactors/user/list/userGetListInteractor";
import { UserRepository } from "../repositories/userRepository";
import { User } from "../orm/entities/user";
import { UserCreateInteractor } from "../../application/interactors/user/create/userCreateInteractor";
import { UserSigninInteractor } from "../../application/interactors/user/signin/userSigninInteractor";

export const setup = async () => {
  const conn = await createConnection();
  container.register("UserGetListUsecase", { useClass: UserGetListInteractor });
  container.register("UserCreateUsecase", { useClass: UserCreateInteractor });
  container.register("UserSigninUsecase", { useClass: UserSigninInteractor });
  container.register("UserRepository", {
    useFactory: () => {
      return new UserRepository(conn.getRepository(User));
    },
  });
};
