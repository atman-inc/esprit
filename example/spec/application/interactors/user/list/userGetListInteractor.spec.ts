import { User } from "../../../../../lib/domain/entiies/user";
import { UserGetListInteractor } from "../../../../../lib/application/interactors/user/list/userGetListInteractor";

const mockRepo = {
  findAll: jest.fn(),
};

describe("#handle", () => {
  mockRepo.findAll.mockReturnValue([
    new User(1, "taro"),
    new User(2, "hanako"),
  ]);
  const interactor = new UserGetListInteractor(mockRepo);

  it("return all users", async () => {
    const results = await interactor.handle();
    expect(results).toHaveLength(2);
  });
});
