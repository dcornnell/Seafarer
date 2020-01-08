const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EventSchema = new Schema({
  start_date: Date,
  end_date: Date,
  description: String,
  title: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    ships: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ship"
      }
    ]
  }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
