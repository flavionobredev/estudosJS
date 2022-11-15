const app = require("express")();
const pino = require("pino-http")();

app.use(pino);

app.get("/", function (req, res) {
  req.log.info("something");
  res.json({ message: "hello world" });
});

app.listen(3001);
