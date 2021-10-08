const { EventEmitter } = require("events");
const { resolve } = require("path");
const { createReadStream } = require("fs");
const { Transform, Readable, Writable, pipeline } = require("stream");
const { promisify } = require("util");

const pipelineAsync = promisify(pipeline);

class Database extends EventEmitter {
  /**
   * @type {Database}
   */
  static #instance = null;

  #data = null;

  /**
   * path do banco de dados
   *
   * (simulando uma uri)
   */
  #path = resolve(__dirname, "database.json");

  constructor(options = {}) {
    super();
    this.#path = options.path ? options.path : this.#path;
  }

  static async forRoot(options) {
    if (Database.#instance) return Database.#instance;
    Database.#instance = new Database(options);
    await Database.#instance.#connect();
    // if (!success) return process.exit(1);
    return Database.#instance;
  }

  async #connect() {
    const path = this.#path;
    let dataInMemory = "";
    const readableStream = Readable({
      read: function () {
        const file = createReadStream(path);
        file.on("data", (chunk) => {
          this.push(chunk);
        });
        file.on("end", () => this.push(null));
      },
    });

    const parseData = Transform({
      transform(chunk, enconding, cb) {
        const parsed = JSON.parse(chunk);
        parsed.forEach((item) => (item.read = true));
        cb(null, JSON.stringify(parsed));
      },
    });

    const writeData = Writable({
      write: (chunk, encoding, cb) => {
        dataInMemory += chunk;
        cb(null, dataInMemory);
      },
    });

    await pipelineAsync(readableStream, parseData, writeData).catch((err) =>
      this.emit("error", {
        error: "CONNECTION_REFUSED",
        message: "Connection refused by server",
        statusCode: 500,
        stack: err,
      })
    );
    this.emit("connection");
    this.#data = JSON.parse(dataInMemory);
    console.log(this.#data);
  }
}

module.exports = Database;
module.exports = { Database };
