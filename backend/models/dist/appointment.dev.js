"use strict";

var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date,
  status: {
    type: String,
    "default": 'booked'
  }
});
module.exports = mongoose.model('Appointment', appointmentSchema);
//# sourceMappingURL=appointment.dev.js.map
