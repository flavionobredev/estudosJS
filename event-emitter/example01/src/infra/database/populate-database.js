const { pipeline, Readable, Transform } = require("stream");
const { createWriteStream } = require("fs");
const { promisify } = require("util");

const pipelineAsync = promisify(pipeline);

const names = ["Jao", "Ze", "Chaos"];
const last = ["Gomes", "O Fela", "Firebal"];
const genIndex = () => Math.floor(Math.random() * 3);
const genAge = () => Math.floor(Math.random() * 30) + 18;

function* genUsers() {
  for (let i = 0; i < 100; i++) {
    yield JSON.stringify({
      _id: i + 1,
      name: `${names[genIndex()]} ${last[genIndex()]}`,
      age: genAge(),
      isDev: i % 2 === 0,
    });
  }
}

const readUsers = Readable({
  read: function () {
    for (let user of genUsers()) {
      this.push(user);
    }
    this.push(null);
  },
});

const parseToArray = Transform({
  transform(chunk, enconding, cb) {
    this.counter = this.counter ? this.counter : 0;
    if (this.counter) {
      return cb(null, "," + chunk);
    }

    this.counter += 1;
    cb(null, "[".concat(chunk));
  },
});

pipelineAsync(readUsers, parseToArray, createWriteStream("database.json"));
