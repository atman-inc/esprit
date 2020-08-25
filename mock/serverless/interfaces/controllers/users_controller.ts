import { UsersUsecase } from "../../application/usecases/users_usecase";
import { injectable } from "tsyringe";
import express from "express";

@injectable()
export class UsersController {
  constructor(private readonly usecase: UsersUsecase) {}

  async index(_req: express.Request, res: express.Response) {
    const users = await this.usecase.findAll();

    res.send(JSON.stringify(users));
  }

  async create(req: express.Request, res: express.Response) {
    const { name, age } = req.body;
    const user = this.usecase.create(name, parseInt(age));

    res.send(JSON.stringify(user));
  }
}
