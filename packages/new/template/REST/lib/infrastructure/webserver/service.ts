import { FastifyRequest } from "fastify";

class Service {
  async welcom() {
    return {
      message: "welcom <%= name %>"
    }
  }
}

module.exports = () => new Service();
