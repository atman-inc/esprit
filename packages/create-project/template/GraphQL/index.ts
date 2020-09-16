import { createServer } from "./lib/infrastructure/graphqlserver/server";

const main = async () => {
  const server = await createServer();

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

main();
