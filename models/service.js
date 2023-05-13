const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: String,
  duration: Number,
  price: Number,
  category:String,
  description:String,
  img: String,
});

module.exports = mongoose.model("Service", serviceSchema);
