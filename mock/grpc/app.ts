import grpc from 'grpc'
import 'reflect-metadata'
import { createConnection } from "typeorm";

(async () => {
    await createConnection()
    const server = new grpc.Server()

    server.addService

    server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
    console.log('run http://127.0.0.1:50051')
    server.start()
})()