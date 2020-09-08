import fastify, { FastifyInstance } from "fastify";
import { setup } from "./setup";
import openapiGlue from "fastify-openapi-glue";
import { env } from "process";
import fastifyJwt from "fastify-jwt";

export const createServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: env.NODE_ENV === "development",
  });

  await setup();

  server.register(fastifyJwt, {
    secret: "supersecret",
  });

  server.register(openapiGlue, {
    specification: `${__dirname}/swagger.bundle.json`,
    service: `${__dirname}/service.ts`,
  });

  return server;
};
