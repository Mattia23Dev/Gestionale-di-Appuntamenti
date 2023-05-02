const mongoose = require("mongoose");
const service = require("./service");
const Schema = mongoose.Schema;

const treatmentSchema = new Schema({
  // booked: boolean,
  // duration: Number,
  // price: Number,
  name: String,
});

module.exports = mongoose.model("Treatment", treatmentSchema);
