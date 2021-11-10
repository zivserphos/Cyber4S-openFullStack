const express = require("express");
const infoRouter = express.Router();
const Person = require("../mongodb/mongoPerson");

infoRouter.get("/", async (req, res, next) => {
  console.log("im made here");
  res.send(
    `Phonebook has info for ${await Person.find(
      {} // _id:3
    ).count()} peaple.\n${new Date()}`
  );
});

module.exports = infoRouter;
