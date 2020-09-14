import fastify from "fastify";

const app = fastify({
  logger: true,
});

app.get("/", (req, reply) => {
  reply.send({ hello: "world" });
});

app.listen(3000, "0.0.0.0");