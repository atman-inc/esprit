import fastify, { FastifyInstance } from "fastify";
import openapiGlue from "fastify-openapi-glue";
import config from "esprit.config.json";

export const createServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: true,
  });

  server.register(openapiGlue, {
    specification: config.openAPI.jsonFilePath,
    service: config.openAPI.service,
    securityHandlers: config.openAPI.security,
  });

  return server;
};
