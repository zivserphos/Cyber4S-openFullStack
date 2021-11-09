const express = require("express");
const personsRouter = express.Router();
const fsAsync = require("fs/promises");
const path = require("path");
const util = require("util");
const Person = require("../mongodb/mongoPerson");

const dataBaseFile = async (fileRoot) =>
  JSON.parse(await fsAsync.readFile(`${fileRoot}/data/data.json`));

function generateId() {
  return Math.floor(Math.random() * 1000);
}

function isNameExist(name, fileData) {
  return fileData.findIndex((obj) => obj.name === name) !== -1;
}

async function findPerson(id) {
  return await Person.find({ _id: id });
}

async function isIdExist(id, fileData) {
  fileData.persons.findIndex((obj) => obj.id === id) ? true : false;
}

personsRouter.post("/", async (req, res, next) => {
  const obj = Object.assign({}, req.body);
  const fileData = await Person.find({});
  obj.id = generateId();
  if (!obj.name) {
    next({ status: 400, message: { error: "cannot add without name!" } });
  }
  if (isNameExist(obj.name, fileData)) {
    next({ status: 400, message: { error: "name is not available" } });
  }
  try {
    await createNewPerson(obj.id, obj.name, obj.number);
    res.send("Person added succesfully");
  } catch (err) {
    next({ status: 502, message: { error: "could not succed" } });
  }
});

personsRouter.get("/", async (req, res) => {
  fileRoot = __dirname.split("routes")[0];
  res.sendFile(`${fileRoot}/data/data.json`);
});

personsRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const fileData = await Person.find({});
  const response = await Person.collection.deleteOne({ _id: id });
  if (response.deletedCount === 0) {
    console.log("delete was not succesful");
  }

  //await Person.collection.deleteOne({ _id: 961 });

  //const index = fileData.persons.findIndex((obj) => obj.id === id);
  //index || index === 0 ? fileData.persons.splice(index, 1) : console.log("S");
  //await fsAsync.writeFile("./data/data.json", JSON.stringify(fileData));
  res.end();
});

personsRouter.get("/:id", async (req, res) => {
  const fileRoot = __dirname.split("routes")[0];
  const fileData = await dataBaseFile(fileRoot);
  const id = Number(req.params.id);
  const obj = fileData.persons.find((obj) => obj.id === id);
  obj ? res.send(obj) : res.status(404).send();
});

module.exports = personsRouter;

async function createNewPerson(id, name, number) {
  const person = new Person({ _id: id, name: name, number: number });
  try {
    await person.save();
    return true;
  } catch (error) {
    return false;
  }
}
