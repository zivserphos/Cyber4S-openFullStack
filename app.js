const express = require("express");
const cors = require("cors");
const { urlencoded } = require("body-parser");
const errorHandler = require("./handlers/errorHandler");
const personsRouter = require("./routes/persons.js");
const app = express();
const path = require("path");


app.use(express.json())
app.use("/api/persons" , personsRouter)

app.get("/" , (req ,res) => {
    res.send("hello world")
})

module.exports = app;