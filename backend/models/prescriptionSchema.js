const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
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
  dateIssued: {
    type: Date,
    required: true
  },
  medications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    dosage: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true
    },
    refills: {
      type: Number,
      required: true,
      default: 0
    }
  }],
  notes: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
