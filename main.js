const express = require("express");
const cors = require("cors");
const app = express();
const presonsRouter = require("./routers/presons");
const persons = require("./phonebook");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/persons", presonsRouter);

app.get("/info", (req, res, next) => {
  res.send(`Phonebook has info for ${persons.length} peaple.\n${new Date()}`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
