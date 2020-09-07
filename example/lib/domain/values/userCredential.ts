import { User } from "../entiies/user";

export class UserCredential {
  public token: string;

  constructor(user: User) {
    this.token = `token${user.id}`;
  }
}
