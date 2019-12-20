const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const Point = mongoose.model("Point", PointSchema);

module.exports = Point;
