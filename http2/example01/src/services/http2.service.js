const { createSecureServer } = require("http2");
const pem = require("pem");
const { finished } = require("stream");

const server = createSecureServer(pem, (req, res) => {
  console.log(`[http2Service]\t${req.method} ${req.url}`);

  if (req.url === "/") {
    res.end(`
    <!DOCTYPE html>
    <html lang="pt-br">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Streams</title>
      </head>
      <body>
        Hello Server-Sent EventS
        <ul id="time"></ul>
    
        <script>
          const ev = new EventSource("/time");
          ev.addEventListener("time", (result) => {
            document.getElementById("time").innerHTML +=
              "<li>" + result.data + "</li>";
          });
        </script>
      </body>
    </html>    

    `);
  } else if (req.url === "/time") {
    res.setHeader("content-type", "text/event-stream");
    const interval = setInterval(() => {
      res.write(`event: time\ndata:${new Date().toDateString()}\n\n`);
    }, 1000);
    finished(res.write, () => clearInterval(interval));
    return;
  }

  res.statusCode = 400;
  res.end(`Cannot ${req.method} ${req.url}`);
});

module.exports = {
  http2Module: server,
};
