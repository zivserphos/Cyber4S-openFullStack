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
  return res.send(await Person.find({}));
});

personsRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = await Person.deleteOne({ _id: id });
  if (response.deletedCount === 0) {
    res.send("delete was not succesful");
  }
  res.end();
});

personsRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const obj = await Person.findOne({ _id: id });
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
