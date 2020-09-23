import { ApolloServer } from "apollo-server";
import { typeDefs } from "lib/graphql/typeDefs";
import { resolvers } from "lib/graphql/resolvers";

export const createServer = async (): Promise<ApolloServer> => {
  const server = new ApolloServer({ typeDefs, resolvers });

  return server;
};
