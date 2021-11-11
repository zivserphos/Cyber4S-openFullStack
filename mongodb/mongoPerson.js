const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const personSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, minlength: 3, required: true, unique: true },
  number: { type: String, minlength: 8, required: true },
});
personSchema.plugin(uniqueValidator);
const Person = mongoose.model("person", personSchema);

module.exports = Person;
