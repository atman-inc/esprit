import fastify, { FastifyInstance } from "fastify";
import openapiGlue from "fastify-openapi-glue";

export const createServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: true,
  });

  server.register(openapiGlue, {
    specification: `${__dirname}/swagger.bundle.json`,
    service: `${__dirname}/service`,
  });

  return server;
};
