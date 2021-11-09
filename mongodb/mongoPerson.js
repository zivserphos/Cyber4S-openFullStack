const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  number: String,
});
const Person = mongoose.model("person", personSchema);

module.exports = Person;
