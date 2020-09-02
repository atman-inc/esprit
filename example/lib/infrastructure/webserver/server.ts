import fastify, { FastifyInstance } from "fastify";
import { setup } from "./setup";
import openapiGlue from "fastify-openapi-glue";

export const createServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: true,
  });

  await setup();

  server.register(openapiGlue, {
    specification: `${__dirname}/swagger.bundle.json`,
    service: `${__dirname}/service.ts`,
  });

  return server;
};
