import { createServer } from "http";
import { items } from "./constants.js";

class Controller {
  constructor(items) {
    this.items = items;
  }
  handle() {
    const random = Object.keys(this.items)[Math.floor(Math.random() * 3)];
    return this.items[random];
  }
}

const makeController = () => {
  return new Controller(items);
};

const adapter = (controller) => {
  return (req, res) => {
    const result = controller.handle()
    res.end(result);
  };
};

createServer(adapter(makeController())).listen(3000, () =>
  console.log("server listen on port 3000")
);
