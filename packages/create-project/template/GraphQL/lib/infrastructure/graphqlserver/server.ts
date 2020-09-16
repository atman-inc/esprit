import { ApolloServer } from "apollo-server";
import { typeDefs } from "../../graphql/typeDefs";
import { resolvers } from "../../graphql/resolvers";

export const createServer = async (): Promise<ApolloServer> => {
  const server = new ApolloServer({ typeDefs, resolvers });

  return server;
};
