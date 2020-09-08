import { createServer } from "../../lib/infrastructure/webserver/server";
import { FastifyInstance } from "fastify";
import {
  useRefreshDatabase,
  tearDownDatabase,
  useSeeding,
  factory,
} from "typeorm-seeding";
import { User } from "../../lib/infrastructure/orm/entities/user";
import bcrypt from "bcrypt";

let server: FastifyInstance;
beforeAll(async () => {
  server = await createServer();
  return useSeeding();
});

beforeEach(async () => {
  return useRefreshDatabase();
});

afterAll(async () => {
  return tearDownDatabase();
});

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
  let params: {
    name?: string;
    email?: string;
    password?: string;
    birthday?: string;
  } = {};

  beforeEach(async () => {
    params = {
      name: "taro",
      email: "test@example.com",
      password: "password",
      birthday: "1990-01-01",
    };
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
      ["", "x".repeat(51)].forEach((p) => {
        it("invalid", async () => {
          params.name = p;
          const resp = await subject();
          expect(resp.statusCode).toBe(400);
        });
      });
    });

    describe("with email", () => {
      ["", "hoge"].forEach((p) => {
        it("invalid", async () => {
          params.email = p;
          const resp = await subject();
          expect(resp.statusCode).toBe(400);
        });
      });
    });

    describe("with password", () => {
      ["", "pass"].forEach((p) => {
        it("invalid", async () => {
          params.email = p;
          const resp = await subject();
          expect(resp.statusCode).toBe(400);
        });
      });
    });

    describe("with birthday", () => {
      ["", "pass"].forEach((p) => {
        it("invalid", async () => {
          params.email = p;
          const resp = await subject();
          expect(resp.statusCode).toBe(400);
        });
      });
    });
  });
});

describe("POST /signin", () => {
  let params: {
    email?: string;
    password?: string;
  } = {};

  beforeEach(async () => {
    params = {
      email: "test@example.com",
      password: "password",
    };
  });

  const subject = async () => {
    return await server.inject({
      method: "POST",
      url: "/signin",
      payload: params,
    });
  };

  it("succeeded", async () => {
    const encrypted_password = await bcrypt.hash(params.password, 10);
    await factory(User)().create({
      email: params.email,
      encrypted_password: encrypted_password,
    });

    const resp = await subject();
    expect(resp.statusCode).toBe(200);
  });

  describe("when invalid parameter", () => {
    describe("with email", () => {
      ["", "hoge"].forEach((p) => {
        it("invalid", async () => {
          params.email = p;
          const resp = await subject();
          expect(resp.statusCode).toBe(400);
        });
      });
    });

    describe("with password", () => {
      ["", "pass"].forEach((p) => {
        it("invalid", async () => {
          params.email = p;
          const resp = await subject();
          expect(resp.statusCode).toBe(400);
        });
      });
    });
  });
});
