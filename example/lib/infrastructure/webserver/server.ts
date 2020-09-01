import fastify, { FastifyInstance } from "fastify";
import { userRoute } from "../../interface/routes/userRoute";
import { setup } from "./setup";

export const createServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: true,
  });

  await setup();

  server.register(userRoute);

  return server;
};
