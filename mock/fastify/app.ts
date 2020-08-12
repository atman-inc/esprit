import fastify from "fastify";
import "reflect-metadata";
import {createConnection} from "typeorm";
import { container } from "tsyringe";
import { User } from "./lib/domain/user.entity";
import server from "./lib/server";

(async function() {
  const connection = await server.connectionDatabase.create()
  container.register('usersDB', { useValue: connection.getRepository(User) })

  const app = fastify({
    logger: true,
  });

  app.register(require("./lib/interfaces/routes/users"));

  app.listen(3000, "0.0.0.0", (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
})();