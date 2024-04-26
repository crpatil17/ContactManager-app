const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case 400:
      res.json({
        title: "validation failed",
        message: err.message,
        stackrace: err.stack,
      });
      break;
    case 401:
      res.json({
        title: "UNAUTHORIZED ",
        message: err.message,
        stackrace: err.stack,
      });
      break;
    case 403:
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        stackrace: err.stack,
      });
      break;
    case 404:
      res.json({
        title: "not found",
        message: err.message,
        stackrace: err.stack,
      });
      break;
    case 500:
      res.json({
        title: "SERVER ERROR",
        message: err.message,
        stackrace: err.stack,
      });
      break;
    default:
      console.log("all good no error");
      break;
  }

  res.json({ title: "not found", message: err.message, stackrace: err.stack });
};

module.exports = errorHandler;
