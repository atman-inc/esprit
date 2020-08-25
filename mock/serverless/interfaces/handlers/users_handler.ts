import "reflect-metadata";
import * as AWS from "aws-sdk";
import { container } from "tsyringe";
import { UsersController } from "../controllers/users_controller";
import { DynamoStore } from "@shiftcoders/dynamo-easy";
import { User } from "../../domain/entities/users_entity";
import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json({ strict: false }));

const db = new AWS.DynamoDB({
  region: "us-west-2",
  accessKeyId: "fakeMyKeyId",
  secretAccessKey: "fakeSecretAccessKey",
  endpoint: "http://db:8000",
});
container.register("usersStore", { useValue: new DynamoStore(User, db) });

app.get("/users", (req, res) => {
  const controller = container.resolve(UsersController);
  controller.index(req, res);
});
app.post("/users", (req, res) => {
  const controller = container.resolve(UsersController);
  controller.create(req, res);
});

export const handler = serverless(app);
