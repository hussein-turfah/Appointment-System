const mongoose = require('mongoose');

const doctorScheduleSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  weekday: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    required: true
  },
  startTime: {
    type: String,
    match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, // Validate time format
    required: true
  },
  endTime: {
    type: String,
    match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
    required: true
  }
});

module.exports = mongoose.model('DoctorSchedule', doctorScheduleSchema);
