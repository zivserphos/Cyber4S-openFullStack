function errorHandler(err, req, res, next) {
  if (!err.status) {
    res.status(500);
    return res.send(err.message);
  }
  res.status(err.status);
  res.send(err.message);
  next();
}

module.exports = errorHandler;
