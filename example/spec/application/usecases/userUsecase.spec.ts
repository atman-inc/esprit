import { UserUsecase } from "../../../lib/application/usecases/userUsecase";
import { User } from "../../../lib/domain/entiies/user";

const mockRepo = {
  findAll: jest.fn(),
};

describe("#findAll", () => {
  mockRepo.findAll.mockReturnValue([
    new User(1, "taro"),
    new User(2, "hanako"),
  ]);
  const usecase = new UserUsecase(mockRepo);

  it("return all users", async () => {
    const results = await usecase.findAll();
    expect(results).toHaveLength(2);
  });
});
