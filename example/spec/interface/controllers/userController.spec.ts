import { UserController } from "../../../lib/interface/controllers/userController";
import { User } from "../../../lib/domain/entiies/user";

describe("#index", () => {
  const mockUsecase = {
    handle: jest.fn(),
  };
  mockUsecase.handle.mockReturnValue([
    new User(1, "taro"),
    new User(2, "hanako"),
  ]);

  const subject = async () => {
    const controller = new UserController(mockUsecase);
    const results = await controller.index();

    return results;
  };

  it("return all users", async () => {
    expect(await subject()).toHaveLength(2);
  });
});
