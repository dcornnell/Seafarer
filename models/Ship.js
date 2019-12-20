const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ShipSchema = new Schema({
  name: String,
  type: String,
  country: String,
  about: String,
  country: String,
  captains: [
    {
      type: Schema.Types.ObjectId,
      ref: "Person"
    }
  ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
});

const Ship = mongoose.model("Ship", ShipSchema);

module.exports = Ship;
