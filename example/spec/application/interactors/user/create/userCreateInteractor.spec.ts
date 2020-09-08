import { User } from "../../../../../lib/domain/entiies/user";
import { UserCreateInteractor } from "../../../../../lib/application/interactors/user/create/userCreateInteractor";
import { UserCreateInputData } from "../../../../../lib/application/usecases/user/create/userCreateInputData";
import { useSeeding, factory } from "typeorm-seeding";

beforeAll(() => {
  return useSeeding();
});

const mockRepo = {
  findAll: jest.fn(),
  findByEmail: jest.fn(),
  insert: jest.fn(),
};

describe("#handle", () => {
  const inputData = new UserCreateInputData(
    "taro",
    "test@example.com",
    "password",
    new Date("1990-01-01")
  );

  const subject = async () => {
    const interactor = new UserCreateInteractor(mockRepo);
    return await interactor.handle(inputData);
  };

  describe("when exist duplicate user", () => {
    it("throw error", async () => {
      mockRepo.findByEmail.mockReturnValueOnce(
        await factory(User)().make({ id: 1 })
      );
      await expect(subject()).rejects.toThrowError(/duplicated use/);
    });
  });

  describe("when does not exist duplicate user", () => {
    it("return user", async () => {
      mockRepo.insert.mockReturnValueOnce(
        await factory(User)().make({ id: 1 })
      );
      const result = await subject();
      expect(result.id).toBe(1);
    });
  });
});
