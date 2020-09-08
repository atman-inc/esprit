import { createConnection, getRepository } from "typeorm";
import {
  factory,
  useSeeding,
  useRefreshDatabase,
  tearDownDatabase,
} from "typeorm-seeding";
import { User } from "../../../lib/infrastructure/orm/entities/user";
import { User as DomainUser } from "../../../lib/domain/entiies/user";
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

  // describe("#findAll", () => {
  //   beforeAll(async () => {
  //     await factory(User)({ name: "taro" }).create();
  //     await factory(User)({ name: "hanako" }).create();
  //   });

  //   const subject = async () => {
  //     const repo = new UserRepository(getRepository(User));
  //     const results = await repo.findAll();

  //     return results;
  //   };

  //   it("return all users", async () => {
  //     expect(await subject()).toHaveLength(2);
  //   });
  // });

  describe("#insert", () => {
    const subject = async () => {
      const repo = new UserRepository(getRepository(User));
      const result = await repo.insert(
        new DomainUser(
          null,
          "taro",
          "test@example.com",
          "encrypted_password",
          new Date("1990-01-01")
        )
      );

      return result;
    };

    it("inserted", async () => {
      const user = await subject();
      expect(user).not.toBeNull();
      expect(user.name).toBe("taro");
      expect(user.email).toBe("test@example.com");
      expect(user.encrypted_password).toBe("encrypted_password");
      expect(user.birthday.toDateString()).toBe(
        new Date("1990-01-01").toDateString()
      );
    });

    it("error if duplicate email", async () => {
      await subject();
      await expect(subject()).rejects.toThrowError(
        /duplicate key value violates unique constraint/
      );
    });
  });

  describe("#findByEmail", () => {
    const email = "test@example.com";
    const subject = async () => {
      const repo = new UserRepository(getRepository(User));
      return repo.findByEmail(email);
    };

    describe("when user does not exist", () => {
      it("return undefined", async () => {
        expect(await subject()).toBeUndefined();
      });
    });

    describe("when user exist", () => {
      beforeAll(async () => {
        await factory(User)({ email: email }).create();
      });

      it("return user", async () => {
        const user = await subject();
        expect(user).not.toBeUndefined();
        expect(user?.email).toBe(email);
      });
    });
  });
});
