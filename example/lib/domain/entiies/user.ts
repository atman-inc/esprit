export class User {
  constructor(
    public id: number | null,
    public name: string,
    public email: string,
    public birthday: Date,
    public icon: string | null,
    public createdAt: Date | null,
    public updatedAt: Date | null
  ) {}
}
