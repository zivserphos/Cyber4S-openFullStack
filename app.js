const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");
const personsRouter = require("./routes/persons.js");
const infoRouter = require("./routes/infoRouter");
const app = express();
const path = require("path");
const morgan = require("morgan");
const morganHandler = require("./handlers/morgan");
const mongoose = require("mongoose");
const url =
  "mongodb+srv://ziv_serphos1:123456zain@cluster0.zcgdd.mongodb.net/phonebook?retryWrites=true&w=majority";

app.use(express.json());
mongoose.connect(url);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(
  morganHandler,
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/", express.static(path.resolve(`./dist`)));

app.get("/addContact", (req, res) => {
  res.sendFile(__dirname + "/dist/infoPage.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.use("/api/persons", personsRouter);
app.use("/info", infoRouter);

module.exports = app;
