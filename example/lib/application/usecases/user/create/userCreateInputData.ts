export class UserCreateInputData {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public birthday: Date
  ) {}
}
