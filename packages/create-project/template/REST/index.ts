import { createServer } from "lib/infrastructure/webserver/server";
import "reflect-metadata";
import { registerDI } from "lib/infrastructure/di";

const main = async () => {
  registerDI();
  const server = await createServer();
  server.listen(3000, "0.0.0.0");
};

main();
