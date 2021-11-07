const express = require("express");
const { persons } = require("../phonebook");
const router = express.Router();
/**
 * *This route routes to:
 * ? /api/persons
 */
router.get("/", (req, res, next) => {
  res.send(persons);
});

module.exports = router;
