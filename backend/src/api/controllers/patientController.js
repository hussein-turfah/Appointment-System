const Patient = require('../models/patientSchema')

const createPatient = async (req, res) => {
    try {
      const patientData = req.body;
  
      const newPatient = new Patient(patientData);
      await newPatient.save();
  
      return res.status(201).json({
        message: 'Patient created successfully!',
        data: newPatient.transform(),
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error creating patient' });
    }
  };

  const getPatientById = async (req, res) => {
    try {
      const patientId = req.params.id;
  
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      return res.status(200).json({
        message: 'Patient retrieved successfully!',
        data: patient.transform(),
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error retrieving patient' });
    }
  };

  const getAllPatients = async (req, res) => {
    try {
      const patients = await Patient.find({});
      return res.status(200).json({
        message: 'Patients retrieved successfully!',
        data: patients.map(patient => patient.transform()),
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error retrieving patients' });
    }
  };
  
  const deletePatientById = async (req, res) => {
    try {
      const patientId = req.params.id;
  
      const deletedPatient = await Patient.findOneAndDelete({ _id: patientId });
      if (!deletedPatient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      return res.status(200).json({
        message: 'Patient deleted successfully!',
        data: deletedPatient,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error deleting patient' });
    }
  };
  


  const updatePatientById = async (req, res) => {
    try {
      const patientId = req.params.id;
      const updateData = req.body;
  
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      Object.assign(patient, updateData);
      await patient.save();
  
      return res.status(200).json({
        message: 'Patient updated successfully!',
        data: patient.transform(),
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error updating patient' });
    }
  };
module.exports = {createPatient,deletePatientById,getPatientById,getAllPatients,updatePatientById}