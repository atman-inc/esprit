import { UserController } from "../../../lib/interface/controllers/userController";
import { User } from "../../../lib/domain/entiies/user";
import { UserCredential } from "../../../lib/domain/values/userCredential";

describe("#index", () => {
  // const mockUsecase = {
  //   handle: jest.fn(),
  // };
  // mockUsecase.handle.mockReturnValue([
  //   new User(1, "taro"),
  //   new User(2, "hanako"),
  // ]);
  // const subject = async () => {
  //   const controller = new UserController(mockUsecase);
  //   const results = await controller.index();
  //   return results;
  // };
  // it("return all users", async () => {
  //   expect(await subject()).toHaveLength(2);
  // });
});

describe("#create", () => {
  const mockUsecase = {
    handle: jest.fn(),
  };
  mockUsecase.handle.mockReturnValue(
    new UserCredential(
      new User(1, "taro", "test@example.com", new Date("1990-01-01"))
    )
  );
  const controller = new UserController(mockUsecase, mockUsecase);
  const name = "taro";
  const email = "test@example.com";
  const password = "password";
  const birtyday = new Date("1990-01-01");

  it("return user credential", async () => {
    const result = await controller.create(name, email, password, birtyday);

    expect(result.token).toBe("token1");
  });
});
