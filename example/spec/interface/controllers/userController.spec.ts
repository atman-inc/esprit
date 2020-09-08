import { UserController } from "../../../lib/interface/controllers/userController";
import { User } from "../../../lib/domain/entiies/user";
import { factory, useSeeding } from "typeorm-seeding";

beforeAll(() => {
  return useSeeding();
});

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
  const controller = new UserController(mockUsecase, mockUsecase, mockUsecase);
  const name = "taro";
  const email = "test@example.com";
  const password = "password";
  const birtyday = new Date("1990-01-01");

  it("return user", async () => {
    mockUsecase.handle.mockReturnValue(await factory(User)().make({ id: 1 }));
    const result = await controller.create(name, email, password, birtyday);
    expect(result.id).toBe(1);
  });
});

describe("#signin", () => {
  const mockUsecase = {
    handle: jest.fn(),
  };
  const controller = new UserController(mockUsecase, mockUsecase, mockUsecase);
  const email = "test@example.com";
  const password = "password";

  it("return user", async () => {
    mockUsecase.handle.mockReturnValue(await factory(User)().make({ id: 1 }));
    const result = await controller.signin(email, password);
    expect(result.id).toBe(1);
  });
});
