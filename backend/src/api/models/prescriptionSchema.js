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
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
