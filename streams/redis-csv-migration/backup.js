const { createClient } = require("redis");
const { createWriteStream } = require("fs");
const { Readable, Transform } = require("stream");

const REDIS01_CLIENT = createClient({
  url: "redis://localhost:6379",
});

async function* getDataGenerator() {
  const keys = await REDIS01_CLIENT.keys("*");
  for (const key of keys) {
    const data = await REDIS01_CLIENT.get(key);
    yield JSON.stringify([key, data]);
  }
}

const dataTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.counter = this.counter || 0;
    const [key, value] = JSON.parse(chunk.toString());
    const data = `\n${key},${value}`;
    if (this.counter === 0) {
      this.counter++;
      callback(null, "key,value".concat(data));
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
