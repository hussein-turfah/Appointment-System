const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  allergies: {
    type: [String],
    default: [],
  },
  address: {
    type: String,
    required: true,
  },
});
patientSchema.methods.transform = function() {
  const { _id, firstName, lastName, dob, gender, email, phone, allergies, address } = this;
  return {
      id: _id,
      firstName,
      lastName,
      dob,
      gender,
      email,
      phone,
      allergies,
      address
  };
};
const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
