import { FastifyInstance, FastifyPlugin } from "fastify";
import { container } from "tsyringe";
import { UserController } from "../controllers/userController";

export const userRoute: FastifyPlugin = async (fastify: FastifyInstance) => {
  const controller = container.resolve(UserController);

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
    () => controller.index()
  );
};
