import { FastifyInstance } from "fastify";
import { UsersController } from "../controllers/users_controller";
import { container } from "tsyringe";

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
                id: { type: "number" },
                name: { type: "string" },
                age: { type: "number" },
              },
            },
          },
        },
      },
    },
    (request, reply) => {
      const controller = container.resolve(UsersController);
      controller.index(request, reply);
    }
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
    (request: any, reply) => {
      const controller = container.resolve(UsersController);
      controller.create(request, reply);
    }
  );
};
