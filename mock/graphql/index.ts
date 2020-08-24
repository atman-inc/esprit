import { ApolloServer, gql } from 'apollo-server'
import { typeDefs } from './lib/schema/typeDefs'
import { Resolvers, QueryResolvers, User } from './lib/generated/graphql'

const USERS: User[] = [
    {
      id: '1',
      name: 'Harry Potter and the Chamber of Secrets',
      age: 12,
      isActive: true
    },
    {
      id: '2',
      name: 'Jurassic Park',
      age: 20,
      isActive: false
    },
  ];

const queryResolver: QueryResolvers = {
  users: (): User[] => USERS,
  user: (_, args): User => {
    return USERS.find(u => u.id === args.id)!
  }
}
const resolvers: Resolvers = {
  Query: queryResolver,
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
