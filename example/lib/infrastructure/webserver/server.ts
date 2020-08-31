import fastify, { FastifyInstance } from "fastify";
import { createConnection } from "typeorm";
import { container } from "tsyringe";
import { User } from "../orm/entities/user";
import { UserRepository } from "../repositories/userRepository";
import { userRoute } from "../..//interface/routes/userRoute";

export const createServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: true,
  });

  const connection = await createConnection();
  container.register("userRepository", {
    useValue: new UserRepository(connection.getRepository(User)),
  });

  server.register(userRoute);

  return server;
};
