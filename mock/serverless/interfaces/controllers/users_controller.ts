import { UsersUsecase } from "../../application/usecases/users_usecase";
import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { injectable } from "tsyringe";

@injectable()
export class UsersController {
  constructor(private readonly usecase: UsersUsecase) {}

  async index(
    _event: APIGatewayProxyEvent,
    _context: Context
  ): Promise<APIGatewayProxyResult> {
    const users = this.usecase.findAll();

    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  }
}
