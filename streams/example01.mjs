/* video
    Quem tem medo de Node.js Streams? - conheça a incrível e poderosa funcionalidade do Node.js
    https://www.youtube.com/watch?v=pB5-QzabL2I&t=523s
*/

/* 1 --------- */
// const stdin = process.stdin.on("data", (msg) =>
//   console.log("saida terminal", msg.toString())
// );

// const stdout = process.stdout.on("data", (msg) => {
//   console.log("saida terminal sobreposto", msg.toString());
// });

// /**
//  * o uso do pipe faz com que todos os eventos e outras configurações
//  * registradas em stdin sejam ignoradas e a prioridade seja eventos
//  * e configurações de stdout
//  */
// stdin.pipe(stdout);

/* 2 --------- */
// import http from "http";
// import { readFileSync, createReadStream } from "fs";

// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
// http
//   .createServer((req, res) => {
//     // const file = readFileSync("big.file");
//     // res.write(file);
//     // res.end();

//     /**
//      * a utilização de createReadStream se faz mais performatica
//      * do que o readFileSync utilizado anteriormente.
//      * É possivel notar que, no examplo anterior, o download foi feito
//      * por partes. Porem, utilizando createReadStream, o download foi quebrado
//      * em mais partes e, assim, performando melhor.
//      */
//     createReadStream("big.file").pipe(res);
//   })
//   .listen(3000, () => console.log("running at 3000"));

/* 3 --------- */
import net from "net";
net.createServer((socket) => socket.pipe(process.stdout)).listen(1338);

// node -e "process.stdin.pipe(require('net').connect(1338))"
