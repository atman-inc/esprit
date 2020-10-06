import { createServer } from "lib/infrastructure/graphqlserver/server";
import "reflect-metadata";
import { registerDI } from "lib/infrastructure/di";

const main = async () => {
  registerDI();
  const server = await createServer();

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

main();
