const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const { response } = require("express");
const personRouter = express.Router();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
async function isNameExist(name) {
  const database = JSON.parse(await fs.readFile("db.json", "utf-8"));
  for (let person of database.persons) {
    if (person.name === name) {
      return true;
    } else {
      return false;
    }
  }
}

personRouter.get("/", (request, response) => {
  response.json(persons);
});

personRouter.get("/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = persons.find((person) => person.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});
personRouter.delete("/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});
personRouter.post("/", async (request, response) => {
  const database = JSON.parse((await fs.readFile("db.json")).toString());
  console.log(database);

  const person = request.body;
  person.id = getRandomInt(999);

  if (person.name && person.id) {
    console.log("popo");
    if (!isNameExist(person.name)) {
      console.log(person);
      database.push(person);
      fs.writeFile("./db.json", JSON.stringify(database));
      response.json(person);
    } else {
      response.status(404).end();
    }
  }
});

// personsRouter.post("/", async (req, res) => {
//   const fileRoot = __dirname.split("routes")[0];
//   const fileData = await dataBaseFile(fileRoot);
//   const obj = req.body;
//   if (!obj.name) {
//     res.status(400).send("cannot add without name");
//   }
//   if (await isNameExist(obj.name)) {
//     res.status(403).send("name is not available");
//   }
//   obj.id = generateId();
//   fileData.push(obj);
//   await fsAsync.writeFile("./data/data.json", JSON.stringify(fileData));
// });

module.exports = personRouter;
