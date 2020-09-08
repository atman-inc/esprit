import { FastifyRequest } from "fastify";

class Security {
  async bearerAuth(request: FastifyRequest) {
    await request.jwtVerify();
  }
}

module.exports = new Security();
