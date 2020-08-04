import { FastifyInstance } from "fastify";

module.exports = async function (fastify: FastifyInstance, opts: any) {
  fastify.get("/users", async function (request, reply) {
    return "users list";
  });
};
