import { Resolvers, QueryResolvers, User } from '../../generated/graphql'
import { container } from 'tsyringe';
import { UsersUsecase } from '../../application/usecases/users.usecase';

const queryResolver: QueryResolvers = {
  users: async (): Promise<User[]> => {
      const usecase = container.resolve(UsersUsecase)
      const users = await usecase.findAll()

      return users
  },
  user: async (_, args): Promise<User> => {
    const usecase = container.resolve(UsersUsecase)
    const user = await usecase.findOne(args.id)

    return user!
  },
}

export const resolvers: Resolvers = {
    Query: queryResolver
}