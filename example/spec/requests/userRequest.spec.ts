import { createServer } from "../../lib/infrastructure/webserver/server";

describe("GET /users", () => {
  it("succeed", async () => {
    const server = await createServer();
    const resp = await server.inject({
      method: "GET",
      url: "/users",
    });

    expect(resp.statusCode).toBe(200);
  });
});
