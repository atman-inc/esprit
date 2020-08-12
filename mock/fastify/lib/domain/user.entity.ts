import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  age: number

  @Column({default: true})
  isActive: boolean
}

export interface IUserCreateParameter {
  name: string;
  age: number;
}
