const { createClient } = require("redis");
const { createWriteStream } = require("fs");
const { Readable, Transform } = require("stream");

const REDIS01_CLIENT = createClient({
  url: process.env.REDIS_BACKUP_URL,
});

const delimiter = "%%";

async function* getDataGenerator() {
  const keys = await REDIS01_CLIENT.keys("*");
  for (const key of keys) {
    const data = await REDIS01_CLIENT.get(key);
    if (!data) continue;
    const currentTtl = await REDIS01_CLIENT.ttl(key);
    yield JSON.stringify([key, data, currentTtl]);
  }
}

const dataTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.counter = this.counter || 0;
    const [key, value, ttl] = JSON.parse(chunk.toString());
    const data = `\n${key}${delimiter}${value}${delimiter}${ttl}`;
    if (this.counter === 0) {
      this.counter++;
      callback(null, `key${delimiter}value${delimiter}ttl`.concat(data));
    } else {
      callback(null, data);
    }
  },
});

const bootstrap = async () => {
  await REDIS01_CLIENT.connect();
  const writeStream = createWriteStream("./data/backup.csv");
  const readable = Readable.from(getDataGenerator());
  readable
    .pipe(dataTransform)
    .pipe(writeStream)
    .on("finish", () => {
      REDIS01_CLIENT.quit().then();
    });
};

bootstrap();
