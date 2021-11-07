const express = require("express");
const router = express.Router();
/**
 * *This route routes to:
 * ? /api/persons
 */
router.get("/", (req, res, next) => {
  res.send(persons);
});

module.exports = router;

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
