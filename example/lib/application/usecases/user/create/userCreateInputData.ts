export class UserCreateInputData {
  constructor(
    public email: string,
    public password: string,
    public birthday: Date
  ) {}
}
