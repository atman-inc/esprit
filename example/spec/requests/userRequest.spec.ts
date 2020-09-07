import { createServer } from "../../lib/infrastructure/webserver/server";
import { FastifyInstance } from "fastify";
import { useRefreshDatabase, tearDownDatabase } from "typeorm-seeding";
import { User } from "../../lib/infrastructure/orm/entities/user";

// describe("GET /users", () => {
// let server: FastifyInstance;
// beforeAll(async () => {
//   server = await createServer();
//   await useSeeding();
// });
// afterEach(async () => {
//   await useRefreshDatabase();
// });
// afterAll(async () => {
//   await tearDownDatabase();
// });
// it("succeeded", async () => {
//   await factory(User)({ name: "taro" }).create();
//   await factory(User)({ name: "hanako" }).create();
//   const resp = await server.inject({
//     method: "GET",
//     url: "/users",
//   });
//   expect(resp.statusCode).toBe(200);
// });
// });

describe("POST /users", () => {
  let server: FastifyInstance;
  let params: {
    name?: string | null;
    email?: string | null;
    password?: string | null;
    birthday?: string | null;
  } = {};

  beforeAll(async () => {
    server = await createServer();
  });

  beforeEach(async () => {
    params = {
      name: "taro",
      email: "test@example.com",
      password: "password",
      birthday: "1990-01-01",
    };
  });

  afterEach(async () => {
    await useRefreshDatabase();
  });

  afterAll(async () => {
    await tearDownDatabase();
  });

  const subject = async () => {
    return await server.inject({
      method: "POST",
      url: "/users",
      payload: params,
    });
  };

  it("succeeded", async () => {
    const resp = await subject();
    expect(resp.statusCode).toBe(200);
  });

  describe("when invalid parameter", () => {
    describe("with name", () => {
      [null, "", "x".repeat(51)].forEach((p) => {
        it("invalid", async () => {
          params.name = p;
          const resp = await subject();
          expect(resp.statusCode).toBe(400);
        });
      });
    });

    describe("with email", () => {
      [null, "", "hoge"].forEach((p) => {
        it("invalid", async () => {
          params.email = p;
          const resp = await subject();
          expect(resp.statusCode).toBe(400);
        });
      });
    });

    describe("with password", () => {
      [null, "", "pass"].forEach((p) => {
        it("invalid", async () => {
          params.email = p;
          const resp = await subject();
          expect(resp.statusCode).toBe(400);
        });
      });
    });

    describe("with birthday", () => {
      [null, "", "pass"].forEach((p) => {
        it("invalid", async () => {
          params.email = p;
          const resp = await subject();
          expect(resp.statusCode).toBe(400);
        });
      });
    });
  });
});
