import fastify from "fastify";

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
