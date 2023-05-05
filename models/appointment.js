const mongoose = require("mongoose");
const Client = require("./client");
const Schema = mongoose.Schema;
const addOnSchema = require("./addon");
const Service = require("./service");
const currentDate = new Date().toISOString();

const AppointmentSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  startTime: String,
  morningOrEvening: String,
  endTime: String,
  duration: Number,
  price: Number,
  createdAt: { type: Date, default: currentDate },
  bookedWithCardSquareID: String,
  client: Client.schema.obj,
  esthetician: String,
  treatments: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  addOns: [addOnSchema.schema.obj],
  confirmed: { type: Boolean, default: false },
  notes: String,
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
