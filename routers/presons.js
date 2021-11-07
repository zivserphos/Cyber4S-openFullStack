const express = require("express");
const persons = require("../phonebook");
const router = express.Router();
/**
 * *This route routes to:
 * ? /api/persons
 */
router.get("/:id", (req, res, next) => {
  const person = persons.filter((person) => {
    return parseInt(person.id) === parseInt(req.params.id);
  });
  if (person.length === 0) {
    res.status(404).send("Person not found");
  } else {
    res.json(person);
  }
});

router.delete("/:id", (req, res, next) => {
  const person = persons.filter((person) => {
    return parseInt(person.id) === parseInt(req.params.id);
  });
  if (person.length === 0) {
    res.status(404).send("Person not found");
  } else {
    persons.splice(persons.indexOf(person), 1);
    res.send(`Deleted ${req.params.id}`);
  }
});

router.post("/", (req, res, next) => {
  const newPerson = req.body;
  if (
    !newPerson.hasOwnProperty("name") ||
    !newPerson.hasOwnProperty("number")
  ) {
    res.status(404).json({ error: "name / number missing from body" });
  } else {
    const result = persons.filter((person) => {
      return person.name === newPerson.name;
    });
    if (result.length !== 0) {
      res.status(404).json({ error: "name must be unique" });
    } else {
      newPerson.id = generateId();
      persons.push(newPerson);
      res.send(persons);
    }
  }
});

router.get("/", (req, res, next) => {
  res.send(persons);
});

module.exports = router;

function generateId() {
  return Math.floor(Math.random() * 1000);
}
