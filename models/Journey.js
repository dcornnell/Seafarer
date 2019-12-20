const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JourneySchema = new Schema({
  name: String,
  start_date: Date,
  end_date: Date,
  description: String,
  ships: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ship"
    }
  ]
});

const Journey = mongoose.model("Journey", JourneySchema);

module.exports = Journey;
