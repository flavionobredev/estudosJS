const { createClient } = require("redis");
const crypto = require("crypto");

const REDIS01_CLIENT = createClient({
  url: "redis://localhost:6379",
});

REDIS01_CLIENT.connect().then(async () => {
  const max = 60000;

  const data = {
    id: crypto.randomUUID(),
    name: "John Doe",
  };
  for (let i = 0; i < max; i++) {
    await REDIS01_CLIENT.set(crypto.randomUUID(), JSON.stringify(data), {
      EX: Math.floor(Math.random() * 1e6),
    }).then();
  }

  REDIS01_CLIENT.quit().then();
});
