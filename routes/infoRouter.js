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
  let amount = 0;
  for (let obj in fileData) {
    amount += 1;
  }
  return amount;
}

infoRouter.get("/", async (req, res) => {
  const time = moment().format("dddd,MMMM Do YYYY, h:mm:ss a");
  res.send(`phonebook has info for ${await amountPeople()} people ${time}`);
});

infoRouter.get("/:id", async (req, res) => {
  const fileRoot = __dirname.split("routes")[0];
  const fileData = await dataBaseFile(fileRoot);
  const id = Number(req.params.id);
  const obj = fileData.find((obj) => obj.id === id);
  obj ? res.send(obj) : res.status(404).send();
});
