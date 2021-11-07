const express = require("express");
const cors = require("cors");
const app = express();
const presonsRouter = require("./routers/presons");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/persons", presonsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
