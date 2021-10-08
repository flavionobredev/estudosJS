const { Database } = require("./infra/database");
const http = require("http");

class AppModule {
  /**
   * @type {Database}
   */
  #database = null;
  #controllers = null;

  /**
   * @type {http.Server}
   */
  #app = null;

  constructor(app) {
    this.#initDatabase();
    this.#app = app;
  }

  bootstrap({ port }) {
    this.#app.listen(port, () => {
      console.log("Application is running");
    });
  }

  async #initDatabase() {
    this.#database = await Database.forRoot();
    this.#database.on("connection", () => {
      console.log(`[${AppModule.name}] database running`);
    });
    this.#database.on("error", () => {
      console.log(
        `[${AppModule.name}] database crashed. Closing application...`
      );
    });
  }
}

module.exports = AppModule;
