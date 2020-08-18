import grpc from 'grpc'
import 'reflect-metadata'
import * as users_grpc_pb from './lib/proto/users_grpc_pb'
import { UsersService } from './lib/interfaces/grpc/users.service'
import { createConnection } from "typeorm";
import { container } from 'tsyringe';
import { User } from './lib/domain/entities/user.entity';

(async () => {
    const connection = await createConnection()
    container.register('usersDB', { useValue: connection.getRepository(User) })

    const server = new grpc.Server()

    server.addService(users_grpc_pb.UsersService, new UsersService())

    server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
    console.log('run http://127.0.0.1:50051')
    server.start()
})()