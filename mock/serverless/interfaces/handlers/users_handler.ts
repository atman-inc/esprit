import "reflect-metadata";
import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { container } from "tsyringe";
import { UsersController } from "../controllers/users_controller";

export const index: APIGatewayProxyHandler = async (event, context) => {
  const controller = container.resolve(UsersController);

  return controller.index(event, context);
};
