import fastify, { FastifyInstance } from "fastify";

export const createServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: true,
  });

  return server;
};
