import { Resolvers, QueryResolvers, Task } from '../../generated/graphql'

const TASKS: Task[] = [
    {
      id: '1',
      title: 'TASK A'
    },
    {
      id: '2',
      title: 'TASK B'
    },
  ];

 const queryResolver: QueryResolvers = {
     task: (_, args): Task => {
         return TASKS.find(t => t.id === args.id)!
     }
 }

 export const resolvers: Resolvers = {
     Query: queryResolver
 }