const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (phone) => /^\d+$/.test(phone),
      message: 'Invalid phone number format'
    }
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
      type: String,
      required: true,
      trim: true
  },

  allergies: {
    type: [String],
    trim: true
  },

  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  invoices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice'
  }],
  medicalRecords: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalRecord'
  }],
  prescriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  }]
});

module.exports = mongoose.model('Patient', patientSchema);
