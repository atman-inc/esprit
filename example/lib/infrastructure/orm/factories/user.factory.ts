import { define } from "typeorm-seeding";
import { User } from "../entities/user";

define(User, () => {
  const user = new User();
  user.name = "test";
  user.email = "test@example.com";
  user.encryptedPassword = "encrypted_password";
  user.birthday = new Date("1990-01-01");
  user.icon = "http://exmaple.com/icon.jpg";

  return user;
});
