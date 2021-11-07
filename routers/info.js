const express = require("express");
const persons = require("../phonebook");
const router = express.Router();

// * main - REST
router.get("/", (req, res, next) => {
  res.send(`Phonebook has info for ${persons.length} peaple.\n${new Date()}`);
});

module.exports = router;
