import { createServer } from "../../lib/infrastructure/webserver/server";
import { FastifyInstance } from "fastify";
import { getConnection } from "typeorm";

describe("GET /users", () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await createServer();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it("succeed", async () => {
    const resp = await server.inject({
      method: "GET",
      url: "/users",
    });

    expect(resp.statusCode).toBe(200);
  });
});
