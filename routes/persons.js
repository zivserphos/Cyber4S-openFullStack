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
  const isExist = fileData.findIndex((obj) => obj.name === name);
  isExist === -1 ? false : true;
}

async function findPerson(id) {
  return await Person.find({ _id: id });
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
  const obj = Object.assign({}, req.body);
  const fileData = await Person.find({});
  obj.id = generateId();
  if (!obj.name) {
    throw { status: 400, message: { error: "cannot add without name!" } };
  }
  console.log(obj.name);
  if (isNameExist(obj.name, fileData)) {
    console.log("Ggg");
    throw { status: 409, message: { error: "name is not available" } };
  }
  try {
    console.log("im here");
    await createNewPerson(obj.id, obj.name, obj.number);
    res.send("Person added succesfully");
  } catch (err) {
    next({ status: 502, message: { error: "could not succed" } });
  }

  // const fileRoot = __dirname.split("routes")[0];
  // console.log(req.body);
  // const fileData = await dataBaseFile(fileRoot);
  // const obj = req.body;
  // if (!obj.name) {
  //   res.status(400).send("cannot add without name!");
  // }
  // if (isNameExist(obj.name, fileData)) {
  //   res.status(409).send("name is not available");
  // }
  // obj.id = generateId();
  // console.log(obj);
  // fileData.persons.push(obj);
  // await fsAsync.writeFile("./data/data.json", JSON.stringify(fileData));
  // res.end();
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
