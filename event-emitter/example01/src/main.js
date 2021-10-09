const AppModule = require("./app.module");
const app = require("./app");

async function bootstrap() {
  const appModule = new AppModule(app);
  appModule.init({ port: 3000 });
}

bootstrap();
