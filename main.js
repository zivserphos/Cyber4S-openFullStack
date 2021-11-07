const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const presonsRouter = require("./routers/presons");
const persons = require("./phonebook");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// * Middlwares
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// * Routers
app.use("/api/persons", presonsRouter);

// * main - REST
app.get("/info", (req, res, next) => {
  res.send(`Phonebook has info for ${persons.length} peaple.\n${new Date()}`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
