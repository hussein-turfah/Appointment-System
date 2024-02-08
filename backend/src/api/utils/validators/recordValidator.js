const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const MedicalRecord = require('../../models/medicalRecords');

// Validator middleware for creating a medical record
exports.createMedicalRecordValidator = [
  check('patientId')
    .notEmpty()
    .withMessage('Patient ID is required'),
  check('title')
    .notEmpty()
    .withMessage('Title is required'),
  check('notes')
    .notEmpty()
    .withMessage('Notes are required'),
  check('doctorId')
    .notEmpty()
    .withMessage('Doctor ID is required'),
  validatorMiddleware,
];


exports.updateMedicalRecordValidator = [
  check('medicalRecordId')
    .isMongoId()
    .withMessage('Invalid medical record ID format'),
  check('title')
    .optional()
    .notEmpty()
    .withMessage('Title is required'),
  check('notes')
    .optional()
    .notEmpty()
    .withMessage('Notes are required'),
  check('doctorId')
    .optional()
    .notEmpty()
    .withMessage('Doctor ID is required'),
  validatorMiddleware,
];


exports.deleteMedicalRecordValidator = [
  check('medicalRecordId')
    .isMongoId()
    .withMessage('Invalid medical record ID format'),
  validatorMiddleware,
];


exports.getMedicalRecordByIdValidator = [
  check('medicalRecordId')
    .isMongoId()
    .withMessage('Invalid medical record ID format'),
  validatorMiddleware,
];


exports.getMedicalRecordByPatientIdValidator = [
  check('patientId')
    .isMongoId()
    .withMessage('Invalid patient ID format'),
  validatorMiddleware,
];