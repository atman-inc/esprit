import grpc from 'grpc'

export const createServer = async (): Promise<grpc.Server> => {
  const server = new grpc.Server()

  return server
};
