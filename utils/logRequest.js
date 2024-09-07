// loggingMiddleware.js
const logRequest = (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  next();
};

const createLoggingMiddleware = (prefix) => {
  return (req, res, next) => {
    console.log(`${[prefix]} Request Method: ${req.method}`);
    console.log(`${[prefix]} Request URL: ${req.url}`);
    // console.log(`${[prefix]} Request Headers: ${JSON.stringify(req.headers)}`);
    console.log(`${[prefix]} Request Body: ${JSON.stringify(req.body)}`);
    next();
  };
};

exports.loggingMiddleware = logRequest;
exports.createLoggingMiddleware = createLoggingMiddleware;
