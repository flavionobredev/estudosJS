const AppModule = require("./app.module");
const app = require("./app");

const appModule = new AppModule(app);
appModule.bootstrap({ port: 3000 });
