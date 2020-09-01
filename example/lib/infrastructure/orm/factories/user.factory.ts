import { define } from "typeorm-seeding";
import { User } from "../entities/user";

define(User, () => {
  const user = new User();
  user.name = "test";

  return user;
});
