import { FastifyInstance, FastifyRequest } from "fastify";
import { UsersController } from "../controllers/users_controller";

class User {
  constructor(
    public name: string,
    public age: number,
    public isActive: boolean
  ) {}
}

interface ICreateUserParameter {
  name: string;
}

module.exports = async function (fastify: FastifyInstance) {
  fastify.get(
    "/users",
    {
      schema: {
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                age: { type: "number" },
              },
            },
          },
        },
      },
    },
    UsersController.index
  );

  fastify.post(
    "/users",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "age"],
          properties: {
            name: { type: "string", maxLength: 10 },
            age: { type: "number" },
          },
        },
      },
    },
    UsersController.create
  );
};
