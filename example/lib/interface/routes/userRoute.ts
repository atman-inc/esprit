import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { UserController } from "../controllers/userController";

module.exports = async function (app: FastifyInstance) {
  app.get(
    "/users",
    {
      schema: {
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                name: { type: "string" },
              },
            },
          },
        },
      },
    },
    (request, reply) => {
      const controller = container.resolve(UserController);
      controller.index(request, reply);
    }
  );
};
