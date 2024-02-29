const express = require('express');
const router = express.Router();
const { createMedicalRecordValidator, deleteMedicalRecordValidator, getMedicalRecordByIdValidator, getMedicalRecordByPatientIdValidator } = require('../../utils/validators/recordValidator');
const { createMedicalRecord, uploadRecordAttach, getMedicalRecordByPatientId, deleteMedicalRecord, updateMedicalRecord, getMedicalRecordById, addFeesToMedicalRecord, addPrescriptionsToMedicalRecord } = require('../../controllers/medicalRecord');

// Route for creating a medical record
router.post('/:patientId', createMedicalRecordValidator, uploadRecordAttach, createMedicalRecord);

// Route for updating a medical record
router.put('/:medicalRecordId', uploadRecordAttach, updateMedicalRecord);

// Route for deleting a medical record
router.delete('/:medicalRecordId', deleteMedicalRecordValidator, deleteMedicalRecord);

// Route for getting a medical record by its ID
router.get('/:medicalRecordId', getMedicalRecordByIdValidator, getMedicalRecordById);

// Route for getting medical records by patient ID
router.get('/patient/:patientId', getMedicalRecordByPatientIdValidator, getMedicalRecordByPatientId);

// Route for adding fees to a medical record
router.put('/:medicalRecordId/add-fees', addFeesToMedicalRecord);

// Route for adding prescriptions to a medical record
router.put('/:medicalRecordId/add-prescriptions', addPrescriptionsToMedicalRecord);

module.exports = router;

