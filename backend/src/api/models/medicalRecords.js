const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  diagnosis: {
    type: String
  },
  notes: String,
  attachments: [
    {
      fileName: String,
      filePath: String
    }
  ]
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

module.exports = MedicalRecord;
