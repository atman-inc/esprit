import { createConnection } from "typeorm";
import { container } from "tsyringe";
import { UserGetListInteractor } from "../../application/interactors/user/list/userGetListInteractor";
import { UserRepository } from "../repositories/userRepository";
import { User } from "../orm/entities/user";

export const setup = async () => {
  const conn = await createConnection();
  container.register("UserGetListUsecase", { useClass: UserGetListInteractor });
  container.register("UserRepository", {
    useFactory: () => {
      return new UserRepository(conn.getRepository(User));
    },
  });
};
