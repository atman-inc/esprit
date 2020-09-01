import fastify, { FastifyInstance } from "fastify";
import { setup } from "./setup";
import { userRoute } from "./routes/userRoute";

export const createServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: true,
  });

  await setup();

  server.register(userRoute);

  return server;
};
