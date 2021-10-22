const { App } = require("./app");

const app = new App().initHttp2Module();

app.listen(3010, () => {
  console.clear();
  console.log("server listen on port 3010");
});
