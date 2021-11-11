const express = require("express");
const personsRouter = express.Router();
const Person = require("../mongodb/mongoPerson");
const dotenv = require("dotenv");
dotenv.config();
const secureCode = process.env.SECURE_CODE;

function generateId() {
  return Math.floor(Math.random() * 1000);
}

// function isNameExist(name, fileData) {
//   return fileData.findIndex((obj) => obj.name === name) !== -1;
// }

personsRouter.put("/", async (req, res, next) => {
  const obj = Object.assign({}, req.body);
  try {
    await updatePersonNumber(obj.name, obj.number);
    res.send("Person number updated succesfully");
  } catch (err) {
    next({ status: 502, message: { error: "could not succed" } });
  }
});

personsRouter.post("/", async (req, res, next) => {
  const obj = Object.assign({}, req.body);
  console.log(obj);
  const fileData = await Person.find({});
  obj.id = generateId();
  if (!obj.name) {
    return next({
      status: 400,
      message: { error: "cannot add without name!" },
    });
  }
  if (obj.token !== secureCode) {
    return next({ status: 400, message: { error: "token Invalid" } });
  }
  // if (isNameExist(obj.name, fileData)) {
  //   return next({ status: 400, message: { error: "name is not available" } });
  // }
  try {
    await createNewPerson(obj.id, obj.name, obj.number);
    res.send("Person added succesfully");
  } catch (err) {
    next({ status: 409, message: { error: err._message } });
  }
});

personsRouter.get("/", async (req, res) => {
  console.log("ggg");
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
  await person.save();
}

async function updatePersonNumber(_name, _number) {
  await Person.updateOne({ name: _name }, { number: _number });
}
