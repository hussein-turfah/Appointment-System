const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    medication: {
      type: String,
    },
    title: {
      type: String,
    },
    dosage: {
      type: String,
    },
    attachment: {
      type: String,
    },
    instructions: String,
    // Link to medical record
    medicalRecord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalRecord", // Assuming the name of the medical record model is "MedicalRecord"
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
