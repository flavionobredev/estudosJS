const { createClient } = require("redis");
const { createReadStream } = require("fs");
const { Writable } = require("stream");
const csv = require("csvtojson");

const REDIS02_CLIENT = createClient({
  url: process.env.REDIS_RESTORE_URL,
});

const delimiter = "%%";

const csvToRedis = new Writable({
  write(chunk, encoding, callback) {
    const { key, value, ttl } = JSON.parse(chunk.toString());
    const options = {};
    if (ttl !== "-1") {
      options.EX = Number(ttl);
    }
    REDIS02_CLIENT.set(key, value, options).then().catch(() => {
      console.log("Error: ", key);
    });
    callback();
  },
});

const bootstrap = async () => {
  await REDIS02_CLIENT.connect();
  const readStream = createReadStream("./data/backup.csv");

  readStream
    .pipe(
      csv({
        delimiter: delimiter,
      })
    )
    .pipe(csvToRedis)
    .on("finish", () => {
      REDIS02_CLIENT.quit().then();
    });
};

bootstrap();
