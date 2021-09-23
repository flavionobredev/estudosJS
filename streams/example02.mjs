import { pipeline, Readable, Writable, Transform } from "stream";
import { promisify } from "util";
import { createWriteStream } from "fs";

const pipeLineAsync = promisify(pipeline);
{
  const readableStream = Readable({
    read: function () {
      this.push("hellow dudue 1");
      this.push("hellow dudue 2");
      this.push("hellow dudue 3");
      this.push(null);
    },
  });

  const writableStream = Writable({
    write(chunk, enconding, cb) {
      console.log("msg", chunk, chunk.toString());
      cb();
    },
  });

  await pipeLineAsync(readableStream, writableStream);

  console.log("\n---processo 01 acabou---\n\n");
}
{
  const readableStream = Readable({
    read: function () {
      for (let index = 0; index < 1e5; index++) {
        const person = {
          id: Date.now() + index,
          name: `Flavio-${index}`,
        };

        const data = JSON.stringify(person);
        this.push(data);
      }
      /* avisa que acabaram os dados */
      this.push(null);
    },
  });

  const writableMapToCSV = Transform({
    transform(chunk, enconding, cb) {
      const data = JSON.parse(chunk);
      const result = `${data.id},${data.name.toUpperCase()}\n`;
      cb(null, result);
    },
  });

  const setHeader = Transform({
    transform(chunk, enconding, cb) {
      this.counter = this.counter ?? 0;
      if (this.counter) {
        return cb(null, chunk);
      }

      this.counter += 1;

      cb(null, "id,name\n".concat(chunk));
    },
  });

  await pipeLineAsync(
    readableStream,
    writableMapToCSV,
    setHeader,
    createWriteStream("my.csv")
  );
}
