const express = require("express");
const app = express();
const moment = require("moment");
const fs = require("fs");
const personRouter = require("./routers/personRouter");
const infoRouter = require("./routers/infoRouter");

app.use(express.json());

app.use("/api/persons", personRouter);
app.use("/info/", infoRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
