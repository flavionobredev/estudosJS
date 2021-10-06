const { EventEmitter } = require("events");

class Database extends EventEmitter {
  /**
   * @type {Database}
   */
  static #instance = null;

  static connect() {
    if (Database.#instance) return Database.#instance;
    Database.#instance = new Database();

    /* 
      TODO: retornar erro ou sucesso na conexão
      para fins de exemplo
    */
    const bet = Math.random() * 10 + 1 > 7 ? 0 : 1;
    // TODO: retirar esse setTimeout
    setTimeout(() => {
      bet
        ? this.#instance.emit("connection")
        : this.#instance.emit("error", {
            error: "CONNECTION_REFUSED",
            message: "Connection refused by server",
            statusCode: 500,
          });
    }, 1000);

    return Database.#instance;
  }
}

module.exports = Database;
module.exports = { Database };
