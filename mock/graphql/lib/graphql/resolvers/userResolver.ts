import { Resolvers, QueryResolvers, User } from '../../generated/graphql'

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
  },
}

export const resolvers: Resolvers = {
    Query: queryResolver
}