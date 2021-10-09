const { Database } = require("./infra/database");
const { AppController } = require("./app.controller");
const http = require("http");
const { AppService } = require("./app.service");

class AppModule {
  /**
   * @type {Database}
   */
  #database = null;

  /**
   * @type {http.Server}
   */
  #app = null;

  #services = {};

  constructor(app) {
    this.#app = app;
  }

  async init({ port }) {
    await this.#initDatabase();
    this.#initServices();
    this.#initControllers();
    this.#app.listen(port, () => {
      console.log(`[${AppModule.name}] 🤺 App listen on port ${port}`);
    });
  }

  #initControllers() {
    AppController(this.#app, this.#services.appService);
  }

  #initServices() {
    this.#services = { appService: new AppService(this.#database) };
  }

  async #initDatabase() {
    return new Promise((resolve, reject) => {
      this.#database = Database.forRoot();
      this.#database.on("ready", () => {
        resolve(console.log(`[${AppModule.name}] Database started`));
      });
      this.#database.on("error", () => {
        reject(`[${AppModule.name}] Database crashed. Closing application...`);
      });
    });
  }
}

module.exports = AppModule;
