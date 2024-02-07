const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  reason: String,
  status: {
    type: String,
    enum: ['scheduled', 'cancelled', 'completed'],
    default: 'scheduled'
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;