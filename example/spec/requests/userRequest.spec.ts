import { createServer } from "../../lib/infrastructure/webserver/server";
import { FastifyInstance } from "fastify";
import {
  useSeeding,
  useRefreshDatabase,
  tearDownDatabase,
  factory,
} from "typeorm-seeding";
import { User } from "../../lib/infrastructure/orm/entities/user";

describe("GET /users", () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await createServer();
    await useSeeding();
  });

  afterEach(async () => {
    await useRefreshDatabase();
  });

  afterAll(async () => {
    await tearDownDatabase();
  });

  it("succeeded", async () => {
    await factory(User)({ name: "taro" }).create();
    await factory(User)({ name: "hanako" }).create();
    const resp = await server.inject({
      method: "GET",
      url: "/users",
    });

    expect(resp.statusCode).toBe(200);
  });
});
