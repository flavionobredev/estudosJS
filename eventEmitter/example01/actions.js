const { AppEvents } = require("./app-events.service");

const appEvents = new AppEvents();

appEvents.on("init", (data) => {
  console.log("this is data", data);
});

appEvents.emit("init", { message: "aqui da certo" });
