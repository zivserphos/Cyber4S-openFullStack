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

router.get("/", (req, res, next) => {
  res.send(persons);
});

module.exports = router;
