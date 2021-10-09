const http = require("http");
const { AppService } = require("./app.service");

module.exports = {
  /**
   *
   * @param {http.Server} app
   * @param { AppService } appService
   */
  AppController: (app, appService) => {
    // const appService = new AppService();
    app.on("request", (req, res) => {
      console.log("[AppController] ", req.method, req.url);
      if (req.url === "/users") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ users: appService.getAllUsers() }));
        return;
      }
      res.end(`Cannot ${req.method} ${req.url}`);
    });
  },
};
