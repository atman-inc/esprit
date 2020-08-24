import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./lib/graphql/typeDefs";
import { resolvers } from "./lib/graphql/resolvers";
import { createConnection } from "typeorm";
import { container } from "tsyringe";
import { User } from "./lib/domain/entities/user.entity";
import { Task } from "./lib/domain/entities/task.entity";

(async () => {
  const connection = await createConnection();
  container.register("usersDB", { useValue: connection.getRepository(User) });
  container.register("tasksDB", { useValue: connection.getRepository(Task) });

  const server = new ApolloServer({ typeDefs, resolvers });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
