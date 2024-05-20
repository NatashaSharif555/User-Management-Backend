const mongoose = require("mongoose");

const meetingsSchema = new mongoose.Schema({
  salesPersonId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Meeting = mongoose.model("Meeting", meetingsSchema);

module.exports = Meeting
