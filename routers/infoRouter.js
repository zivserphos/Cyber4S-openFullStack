const express = require("express");
const moment = require("moment");
const fs = require("fs");
const infoRouter = express.Router();

infoRouter.get("/info", (request, response) => {
  const people = persons.length;
  response.send(`Phonebook has info for ${people} people. \n ${new Date()}`); //need to add moment
});
module.exports = infoRouter;
