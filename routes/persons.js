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

function isNameExist(name, fileData) {
  const index = fileData.persons.findIndex((obj) => obj.name === name);
  index ? true : false;
}

async function isIdExist(id, fileData) {
  fileData.persons.findIndex((obj) => obj.id === id) ? true : false;
}

personsRouter.get("/", async (req, res) => {
  fileRoot = __dirname.split("routes")[0];
  res.sendFile(`${fileRoot}/data/data.json`);
});

personsRouter.delete("/:id", async (req, res) => {
  const fileRoot = __dirname.split("routes")[0];
  const fileData = await dataBaseFile(fileRoot);
  const id = Number(req.params.id);
  console.log(id);
  const index = fileData.persons.findIndex((obj) => obj.id === id);
  console.log(index);
  index || index === 0 ? fileData.persons.splice(index, 1) : console.log("S");
  await fsAsync.writeFile("./data/data.json", JSON.stringify(fileData));
  res.end();
});

personsRouter.get("/:id", async (req, res) => {
  const fileRoot = __dirname.split("routes")[0];
  const fileData = await dataBaseFile(fileRoot);
  const id = Number(req.params.id);
  const obj = fileData.persons.find((obj) => obj.id === id);
  obj ? res.send(obj) : res.status(404).send();
});

personsRouter.post("/", async (req, res) => {
  const fileRoot = __dirname.split("routes")[0];
  const fileData = await dataBaseFile(fileRoot);
  const obj = req.body;
  if (!obj.name) {
    res.status(400).send("cannot add without name!");
  }
  if (isNameExist(obj.name, fileData)) {
    res.status(409).send("name is not available");
  }
  obj.id = generateId();
  fileData.persons.push(obj);
  await fsAsync.writeFile("./data/data.json", JSON.stringify(fileData));
});

module.exports = personsRouter;
