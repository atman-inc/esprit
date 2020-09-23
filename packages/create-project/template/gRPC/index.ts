import grpc from "grpc";
import { createServer } from "lib/infrastructure/grpcserver/server";

const main = async () => {
  const server = await createServer();

  server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
  console.log('run http://127.0.0.1:50051')
  server.start()
};

main();
