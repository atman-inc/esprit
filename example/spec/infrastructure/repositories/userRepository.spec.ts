import { createConnection, getRepository } from "typeorm";
import {
  factory,
  useSeeding,
  useRefreshDatabase,
  tearDownDatabase,
} from "typeorm-seeding";
import { User } from "../../../lib/infrastructure/orm/entities/user";
import { UserRepository } from "../../../lib/infrastructure/repositories/userRepository";

describe("UserRepository", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.synchronize(true);
    await useSeeding();
  });
  afterEach(async () => {
    await useRefreshDatabase();
  });
  afterAll(async () => {
    await tearDownDatabase();
  });

  describe("#findAll", () => {
    beforeAll(async () => {
      await factory(User)({ name: "taro" }).create();
      await factory(User)({ name: "hanako" }).create();
    });

    const subject = async () => {
      const repo = new UserRepository(getRepository(User));
      const results = await repo.findAll();

      return results;
    };

    it("return all users", async () => {
      expect(await subject()).toHaveLength(2);
    });
  });
});
