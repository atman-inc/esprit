export class User {
  constructor(
    public name: string,
    public age: number,
    public isActive: boolean = true
  ) {}
}

export interface IUserCreateParameter {
  name: string;
  age: number;
}
