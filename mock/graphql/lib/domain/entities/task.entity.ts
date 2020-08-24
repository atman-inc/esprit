import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @ManyToOne((type) => User, (user) => user.tasks)
  user: User;
}
