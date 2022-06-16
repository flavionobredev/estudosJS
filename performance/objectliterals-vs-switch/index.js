import { createServer } from "http";

function log(level, message, error = new Error()){
  const forLevels = {
    'info': `[INFO]\t${message}`,
    'error': `[ERROR]\t${message}\nstack:${error.toString()}`,
  }

  return console.log(forLevels[level]);
}

class Logger {
  log(level, message, error = new Error()) {
    const forLevels = {
      'info': `[INFO]\t${message}`,
      'error': `[ERROR]\t${message}\nstack:${error.toString()}`,
    }

    return console.log(forLevels[level]);
  }
}


function handler(request, response) {

  // do something with request
  new Logger().log('info', 'request handled');
  // const forLevels = {
  //   'info': `[INFO]\t${'request handled'}`,
  //   'error': `[ERROR]\t${'request handled'}\nstack:${''.toString()}`,
  // }

  // console.log(forLevels['info']);
  response.end("ok");
}

createServer(handler).listen(3000, () =>
  console.log("server is running at 3000")
);
