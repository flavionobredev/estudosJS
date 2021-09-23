import { createReadStream } from "fs";
import http from "http";

http
  .createServer((req, res) => {
    // res.setHeader("responseType", "arraybuffer");
    createReadStream("big.file").pipe(res);
    // res.end();
  })
  .listen(3000, () => console.log("download service listen on 3000"))
  .on("request", (req, res) => {
    console.log("requested by: ", req.url);
  })
  .on("connection", (stream) => {
    stream.on("data", (data) => {
      console.log(data);
    });
  });
