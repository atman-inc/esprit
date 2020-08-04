import { FastifyInstance, FastifyRequest } from "fastify";

class User {
  constructor(
    public name: string,
    public age: number,
    public isActive: boolean
  ) {}
}

interface ICreateUserParameter {
  name: string;
}

module.exports = async function (fastify: FastifyInstance) {
  const opts = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            name: { type: "string" },
            age: { type: "number" },
          },
        },
      },
    },
  };

  fastify.get("/users", opts, async function (request, reply) {
    return new User("Taro", 18, false);
  });

  const bodyJsonSchema = {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string", maxLength: 10 },
    },
  };
  fastify.post("/users", { schema: { body: bodyJsonSchema } }, async function (
    request: FastifyRequest<{ Body: ICreateUserParameter }>,
    reply
  ) {
    return new User(request.body.name, 18, false);
  });
};
