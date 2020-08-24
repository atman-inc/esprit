import { ApolloServer, gql } from 'apollo-server'
import { typeDefs } from './lib/schema/typeDefs'

const books = [
    {
      id: 1,
      name: 'Harry Potter and the Chamber of Secrets',
      age: 12,
      isActive: true
    },
    {
      id: 2,
      name: 'Jurassic Park',
      age: 20,
      isActive: false
    },
  ];

const resolvers = {
  Query: {
    users: () => books,
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
