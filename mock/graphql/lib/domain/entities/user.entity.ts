import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany((type) => Task, (task) => task.user)
  tasks: Task[];
}
