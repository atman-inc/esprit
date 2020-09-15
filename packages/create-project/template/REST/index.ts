import { createServer } from "./lib/infrastructure/webserver/server";

const main = async () => {
  const server = await createServer();
  server.listen(3000, "0.0.0.0");
};

main();
