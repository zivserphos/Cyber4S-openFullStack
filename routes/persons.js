const express = require("express");
const personsRouter = express.Router();
const fsAsync = require("fs/promises");
const path = require("path");
const util = require("util");

const dataBaseFile = async (fileRoot) =>
  JSON.parse(await fsAsync.readFile(`${fileRoot}/data/data.json`));

function generateId() {
  return Math.floor(Math.random() * 1000);
}

async function isExist(id) {
  const fileRoot = __dirname.split("routes")[0];
  const fileData = await dataBaseFile(fileRoot);
  fileData.findIndex((obj) => obj.id === id) ? true : false;
}

personsRouter.get("/", async (req, res) => {
  //const fileData = (await fsAsync.readFile("./data/data.json")).toString()
  fileRoot = __dirname.split("routes")[0];
  res.sendFile(`${fileRoot}/data/data.json`);
});

personsRouter.delete("/:id", async (req, res) => {
  const fileRoot = __dirname.split("routes")[0];
  const fileData = await dataBaseFile(fileRoot);
  const id = Number(req.params.id);
  const index = fileData.findIndex((obj) => obj.id === id);
  index ? fileData.splice(index, 1) : console.log("s");
  await fsAsync.writeFile("./data/data.json", JSON.stringify(fileData));
});

personsRouter.post("/", async (req, res) => {
  const fileRoot = __dirname.split("routes")[0];
  const fileData = await dataBaseFile(fileRoot);
  const obj = req.body;
  obj.id = generateId();
  fileData.push(obj);
  await fsAsync.writeFile("./data/data.json", JSON.stringify(fileData));
});

module.exports = personsRouter;
