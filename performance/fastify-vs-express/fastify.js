const fastify = require("fastify")({
  logger: true,
});

fastify.get("/", async () => {
  return { message: "hello world" };
});

fastify.listen({port: 3000});
