const http = require("http");
const { AppService } = require("./app.service");

module.exports = {
  /**
   *
   * @param {http.Server} app
   */
  AppController: (app, db) => {
    const appService = new AppService(db);
    app.on("request", (req, res) => {
      console.log("[AppController] ", req.method, req.url);
      if (req.url === "/users") {
        res.statusCode = 200;
        res.end(appService.getAllUsers());
      }
    });
  },
};
