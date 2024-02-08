const express = require('express');
const router = express.Router();
const {createMedicalRecordValidator,deleteMedicalRecordValidator,getMedicalRecordByIdValidator,getMedicalRecordByPatientIdValidator}= require('../../utils/validators/recordValidator')
const { createMedicalRecord, createMedicalRecordForm ,uploadRecordAttach, getMedicalRecordByPatientId, deleteMedicalRecord, updateMedicalRecord, getMedicalRecordById } = require('../../controllers/medicalRecord');

// Route for creating a medical record
router.post('/:patientId' ,createMedicalRecordValidator ,uploadRecordAttach, createMedicalRecord);


// Route for updating a medical record
router.put('/:medicalRecordId', uploadRecordAttach, updateMedicalRecord);

// Route for deleting a medical record
router.delete('/:medicalRecordId', deleteMedicalRecordValidator ,deleteMedicalRecord);

// Route for getting a medical record by its ID
router.get('/:medicalRecordId',getMedicalRecordByIdValidator , getMedicalRecordById);

// Route for getting medical records by patient ID
router.get('/patient/:patientId',getMedicalRecordByPatientIdValidator, getMedicalRecordByPatientId);

module.exports = router;
