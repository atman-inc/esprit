import fastify, { FastifyInstance } from "fastify";
import openapiGlue from "fastify-openapi-glue";
import esprit from '../../../esprit.config'

export const createServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: true,
  });

  server.register(openapiGlue, {
    specification: esprit.openAPI.jsonFilePath,
    service: esprit.openAPI.service,
  });

  return server;
};
