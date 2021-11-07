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
  return fileData.length;
}

infoRouter.get("/", async (req, res) => {
  const time = moment().format("dddd,MMMM Do YYYY, h:mm:ss a");
  res.json(`phonebook has info for ${await amountPeople()} people ${time}`);
});

infoRouter.get("/:id", async (req, res) => {
  const fileRoot = __dirname.split("routes")[0];
  const fileData = await dataBaseFile(fileRoot);
  const id = Number(req.params.id);
  const obj = fileData.find((obj) => obj.id === id);
  obj ? res.send(obj) : res.status(404).send();
});
