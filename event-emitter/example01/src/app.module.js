const { Database } = require("./infra/database");
const { AppController } = require("./app.controller");
const http = require("http");

class AppModule {
  /**
   * @type {Database}
   */
  #database = null;

  /**
   * @type {http.Server}
   */
  #app = null;

  constructor(app) {
    this.#app = app;
  }

  async init({ port }) {
    await this.#initDatabase();
    this.#initControllers();
    this.#app.listen(port, () => {
      console.log(`[${AppModule.name}] 🤺 App listen on port ${port}`);
    });
  }

  #initControllers() {
    AppController(this.#app, this.#database);
  }

  async #initDatabase() {
    return new Promise((resolve, reject) => {
      const connection = Database.forRoot();
      connection.on("ready", (db) => {
        this.#database = db;
        console.log(connection);
        console.log("this data base", this.#database);
        resolve(console.log(`[${AppModule.name}] Database started`));
      });
      connection.on("error", () => {
        reject(`[${AppModule.name}] Database crashed. Closing application...`);
      });
    });
  }
}

module.exports = AppModule;
