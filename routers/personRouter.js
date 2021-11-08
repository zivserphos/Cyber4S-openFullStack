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

  for (let person of database) {
    if (person.name === name) {
      return true;
    }
  }
  console.log("false");
  return false;
}

personRouter.get("/", async (request, response) => {
  const database = JSON.parse(await fs.readFile("db.json", "utf-8"));
  response.json(database);
});

personRouter.get("/:id", async (request, response) => {
  const persons = JSON.parse(await fs.readFile("db.json", "utf-8"));
  
  const id = Number(request.params.id);
  const note = persons.find((person) => person.id === id);
  console.log(note);
  if (note) {
    response.send(note);
  } else {
    response.status(404).end();
  }

});

async function dataBaseFile(){
  const database = JSON.parse(await fs.readFile("db.json", "utf-8"));
  return database;
}
personRouter.delete("/:id", async (req, res) => {
  const fileData = await dataBaseFile();
  const id = Number(req.params.id);
  const index = fileData.findIndex((obj) => obj.id === id);
  
  index || index === 0 ? fileData.splice(index, 1) : console.log("s");
  
  await fs.writeFile("./db.json", JSON.stringify(fileData));
  res.send("user was deleted successfully")
  res.end();
});

personRouter.post("/", async (request, response) => {
  const database = JSON.parse(await fs.readFile("db.json", "utf-8"));

  const person = request.body;
  person.id = getRandomInt(999);

  if (person.name) {
    if (await isNameExist(person.name)) {
      console.log("notgood");
      response.status(404).end();
    } else {
      database.push(person);
      console.log(database);
      fs.writeFile("./db.json", JSON.stringify(database));
      response.json(person);
    }
  }
});


module.exports = personRouter;
