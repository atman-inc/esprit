import grpc from "grpc";
import { createServer } from "lib/infrastructure/grpcserver/server";
import "reflect-metadata";
import { registerDI } from "lib/infrastructure/di";

const main = async () => {
  registerDI();
  const server = await createServer();

  server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
  console.log('run http://127.0.0.1:50051')
  server.start()
};

main();
