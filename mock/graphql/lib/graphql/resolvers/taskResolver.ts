import { Resolvers, QueryResolvers, Task, MutationResolvers, TaskResolvers, User } from '../../generated/graphql'
import { container } from 'tsyringe'
import { TasksUsecase } from '../../application/usecases/tasks.usecase'
import { UsersUsecase } from '../../application/usecases/users.usecase'

 const queryResolver: QueryResolvers = {
     task: async (_, args): Promise<Task> => {
       const usecase = container.resolve(TasksUsecase)
       const task = await usecase.findOne(args.id)

       return task!
     },
 }

 const mutationResolver: MutationResolvers = {
   addTask: async (_, args): Promise<Task> => {
       const usecase = container.resolve(TasksUsecase)
       const task = await usecase.create(args.user_id, args.title)

       return task
   }
 }

 export const resolvers: Resolvers = {
     Query: queryResolver,
     Mutation: mutationResolver,
 }