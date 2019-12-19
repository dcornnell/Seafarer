const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PersonSchema = new Schema({
  name: String,
  birtday: Date,
  death: Date,
  about: String,
  country: String,
  position: String
});

const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;
