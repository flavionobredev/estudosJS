const { http2Module } = require("./services/http2.service");

class App {
  #appInstance = null;

  /**
   *
   * @returns { http2Module }
   */
  initHttp2Module() {
    this.#appInstance = http2Module;
    return this.#appInstance;
  }
}

module.exports = {
  App,
};
