const express = require("express");
const infoRouter = express.Router();
const moment = require("moment");
const fsAsync = require("fs/promises");
const { writeFile } = require("fs");
const Person = require("../mongodb/mongoPerson");

infoRouter.get("/", async (req, res, next) => {
  res.send(
    `Phonebook has info for ${await Person.find(
      {} // _id:3
    ).count()} peaple.\n${new Date()}`
  );
});

module.exports = infoRouter;
