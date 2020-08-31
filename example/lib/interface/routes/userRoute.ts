import { FastifyInstance, FastifyPlugin } from "fastify";
import { container } from "tsyringe";
import { UserController } from "../controllers/userController";

export const userRoute: FastifyPlugin = async (fastify: FastifyInstance) => {
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
