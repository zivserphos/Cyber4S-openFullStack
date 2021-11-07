const express = require("express");
const cors = require("cors");
//const morgan = require("morgan");
const infoRouter = require("./routers/info");
const app = express();
const presonsRouter = require("./routers/presons");
const persons = require("./phonebook");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// * Middlwares
// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms")
// );

// * Routers
app.use("/api/persons", presonsRouter);
app.use("/info", presonsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
