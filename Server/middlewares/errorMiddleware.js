const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = 500
  let message = "Server error"


  if (err.name === "ValidationError") {
    statusCode = 400
    message = err.message
  }else if (err.name === "tokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({ message, error: err.detaild || null });
};

module.exports = errorMiddleware;