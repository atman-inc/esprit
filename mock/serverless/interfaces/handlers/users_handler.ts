import "reflect-metadata";
import * as AWS from "aws-sdk";
import { APIGatewayProxyHandler } from "aws-lambda";
import { container } from "tsyringe";
import { UsersController } from "../controllers/users_controller";
import { DynamoStore } from "@shiftcoders/dynamo-easy";
import { User } from "../../domain/entities/users_entity";

export const index: APIGatewayProxyHandler = async (event, context) => {
  const db = new AWS.DynamoDB({
    region: "us-west-2",
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretAccessKey",
    endpoint: "http://db:8000",
  });
  container.register("usersStore", { useValue: new DynamoStore(User, db) });
  const controller = container.resolve(UsersController);

  return controller.index(event, context);
};
