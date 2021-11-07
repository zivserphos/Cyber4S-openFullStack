const morgan = require("morgan");

function morganHandler(req, res, next) {
  morgan.token("body", function (req, res) {
    return JSON.stringify(req.body);
  });
  next();
}

module.exports = morganHandler;
