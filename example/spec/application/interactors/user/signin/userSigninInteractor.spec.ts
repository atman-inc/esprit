import { UserSigninInputData } from "../../../../../lib/application/usecases/user/signin/userSigninInputData";
import { UserSigninInteractor } from "../../../../../lib/application/interactors/user/signin/userSigninInteractor";
import { User } from "../../../../../lib/domain/entiies/user";
import bcrypt from "bcrypt";
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
  const inputData = new UserSigninInputData("test@example.com", "password");
  const subject = async () => {
    const interactor = new UserSigninInteractor(mockRepo);
    return await interactor.handle(inputData);
  };

  describe("when does not exist user", () => {
    mockRepo.findByEmail.mockReturnValueOnce(null);
    it("throw error", async () => {
      await expect(subject()).rejects.toThrowError(/does not exist user/);
    });
  });

  describe("when does not match password", () => {
    it("throw error", async () => {
      const encryptedPassword = await bcrypt.hash("other password", 10);
      mockRepo.findByEmail.mockReturnValueOnce(
        await factory(User)().make({
          id: 1,
          email: inputData.email,
          encryptedPassword: encryptedPassword,
        })
      );
      await expect(subject()).rejects.toThrowError(/invalid password/);
    });
  });

  describe("when match password", () => {
    it("return user", async () => {
      const encryptedPassword = await bcrypt.hash(inputData.password, 10);
      mockRepo.findByEmail.mockReturnValueOnce(
        await factory(User)().make({
          id: 1,
          email: inputData.email,
          encryptedPassword: encryptedPassword,
        })
      );
      expect((await subject()).id).toBe(1);
    });
  });
});
