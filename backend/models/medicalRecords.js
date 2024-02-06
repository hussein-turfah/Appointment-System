const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
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
  diagnosis: {
    type: String,
    required: true,
    trim: true
  },
  treatmentPlan: {
    type: String,
    required: true,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  attachments: [{
    type: String, // object with details like filename, URL, etc.
    description: {
      type: String,
      trim: true
    }
  }],
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);