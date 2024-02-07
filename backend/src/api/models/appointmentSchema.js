const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, // Validate time format
    required: true
  },
  endTime: {
    type: String,
    match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, // Validate time format
    required: true
  },
  reason: {
    type: String,
    trim: true,
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Confirmed', 'Cancelled', 'Completed', 'Missed'],
    default: 'Scheduled'
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
