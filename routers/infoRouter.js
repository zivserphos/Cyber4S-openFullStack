const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const infoRouter = express.Router();

infoRouter.get("/", async (request, response) => {
  const persons = JSON.parse(await fs.readFile("db.json", "utf-8"));
  
  const people = persons.length;
  response.send(`Phonebook has info for ${people} people. \n ${new Date()}`); //need to add moment
  
});
module.exports = infoRouter;
