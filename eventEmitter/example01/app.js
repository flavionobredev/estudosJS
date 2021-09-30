const http = require("http");
const { AppEvents } = require("./app-events.service.js");
require("./actions");

const appEvents = new AppEvents();

http.createServer().listen(3000, () => {
  appEvents.emit("init", { message: "app started successfully" });
  console.log("server listen on port 3000");
});
