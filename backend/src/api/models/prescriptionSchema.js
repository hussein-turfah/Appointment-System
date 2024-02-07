const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  medicalRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalRecord',
    required: true
  },
  medication: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  instructions: String
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;

