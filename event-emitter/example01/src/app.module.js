const { Database } = require("./infra/database");
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

  bootstrap({ port }) {
    this.#initDatabase();
    this.#app.listen(port, () => {
      console.log("Application is running");
    });
  }

  #initDatabase() {
    this.#database = Database.forRoot();
    this.#database.on("connection", () => {
      console.log(`[${AppModule.name}] database started`);
    });
    this.#database.on("error", () => {
      console.log(
        `[${AppModule.name}] database crashed. Closing application...`
      );
    });
  }
}

module.exports = AppModule;
