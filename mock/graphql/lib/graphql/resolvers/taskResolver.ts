import { Resolvers, QueryResolvers, Task } from '../../generated/graphql'
import { container } from 'tsyringe'
import { TasksUsecase } from '../../application/usecases/tasks.usecase'

 const queryResolver: QueryResolvers = {
     task: async (_, args): Promise<Task> => {
       const usecase = container.resolve(TasksUsecase)
       const task = await usecase.findOne(args.id)

       return task!
     }
 }

 export const resolvers: Resolvers = {
     Query: queryResolver
 }