const express = require("express");
const infoRouter = express.Router();
const moment = require("moment");
const fsAsync = require("fs/promises");
const { writeFile } = require("fs");

module.exports = infoRouter;

const dataBaseFile = async (fileRoot) =>
  JSON.parse(await fsAsync.readFile(`${fileRoot}/data/data.json`));

async function amountPeople() {
  const fileRoot = __dirname.split("routes")[0];
  const fileData = await dataBaseFile(fileRoot);
  return fileData.persons.length;
}

infoRouter.get("/", async (req, res) => {
  console.log("sss");
  const time = moment().format("dddd,MMMM Do YYYY, h:mm:ss a");
  res.json(`phonebook has info for ${await amountPeople()} people ${time}`);
});
