const Patient = require("../models/patientSchema");
const mongoose = require("mongoose");

const createPatient = async (req, res) => {
  try {
    const { firstName, lastName, email, dob, phone, city, gender } = req.body;
    const newPatient = await Patient.createPatient({
      firstName,
      lastName,
      email,
      dob,
      phone,
      city,
      gender,
    });

    return res.status(201).json({
      ...newPatient.transform(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating patient" });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    return res.status(200).json({
      ...patient.transform(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving patient" });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const { search } = req.query;

    // const page = req.query.page ? parseInt(req.query.page) : 1;
    // const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    // const skip = (page - 1) * limit;
    // const patients = await Patient.find().skip(skip).limit(limit);
    // Check if there are more pages
    // const totalPatients = await Patient.countDocuments();
    // const hasMore = page * limit < totalPatients;

    // find patients by query
    const patients = await Patient.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { _id: mongoose.Types.ObjectId.isValid(search) ? new mongoose.Types.ObjectId(search) : null },
      ]
    });

    return res.status(200).json({
      // pagination: {
      //   page,
      //   limit,
      //   totalPatients,
      //   hasMore,
      // },
      data: patients.map((patient) => patient.transform()),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving patients" });
  }
};

const deletePatientById = async (req, res) => {
  try {
    const patientId = req.params.id;

    const deletedPatient = await Patient.findOneAndDelete({ _id: patientId });
    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    return res.status(200).json({
      message: "Patient deleted successfully!",
      data: deletedPatient,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error deleting patient" });
  }
};

const updatePatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const updateData = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    Object.assign(patient, updateData);
    await patient.save();

    return res.status(200).json({
      ...patient.transform(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating patient" });
  }
};
module.exports = {
  createPatient,
  deletePatientById,
  getPatientById,
  getAllPatients,
  updatePatientById,
};
