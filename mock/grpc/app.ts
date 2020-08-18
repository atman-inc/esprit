import grpc from 'grpc'
import 'reflect-metadata'
import * as users_grpc_pb from './lib/proto/users_grpc_pb'
import { UsersService } from './lib/interfaces/grpc/users.service'
import { createConnection } from "typeorm";

(async () => {
    await createConnection()
    const server = new grpc.Server()

    server.addService(users_grpc_pb.UsersService, new UsersService())

    server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
    console.log('run http://127.0.0.1:50051')
    server.start()
})()