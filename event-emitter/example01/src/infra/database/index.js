const { EventEmitter } = require("events");
const { resolve } = require("path");

class Database extends EventEmitter {
  /**
   * @type {Database}
   */
  static #instance = null;

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

  static forRoot(options) {
    if (Database.#instance) return Database.#instance;
    Database.#instance = new Database(options);
    const success = Database.#instance.#connect();
    // if (!success) return process.exit(1);
    return Database.#instance;
  }

  #connect() {
    /* 
      TODO: retornar erro ou sucesso na conexão
      para fins de exemplo
    */
    const bet = Math.random() * 10 + 1 > 7 ? false : true;
    console.log(this);
    bet
      ? this.emit("connection")
      : this.emit("error", {
          error: "CONNECTION_REFUSED",
          message: "Connection refused by server",
          statusCode: 500,
        });
    return bet;
  }
}

module.exports = Database;
module.exports = { Database };
