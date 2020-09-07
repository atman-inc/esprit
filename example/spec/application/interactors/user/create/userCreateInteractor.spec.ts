import { User } from "../../../../../lib/domain/entiies/user";
import { UserCreateInteractor } from "../../../../../lib/application/interactors/user/create/userCreateInteractor";
import { UserCreateInputData } from "../../../../../lib/application/usecases/user/create/userCreateInputData";

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
    mockRepo.findByEmail.mockReturnValueOnce(
      new User(1, "taro", "test@example.com", new Date("1990-01-01"))
    );
    it("throw error", async () => {
      await expect(subject()).rejects.toThrowError(/duplicated use/);
    });
  });

  describe("when does not exist duplicate user", () => {
    mockRepo.insert.mockReturnValueOnce(
      new User(1, "taro", "test@example.com", new Date("1990-01-01"))
    );
    it("return token", async () => {
      const result = await subject();
      expect(result.token).toBe("token1");
    });
  });
});
