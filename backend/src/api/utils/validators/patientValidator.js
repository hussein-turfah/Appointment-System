const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const Patient = require('../../models/patientSchema');

exports.createPatientValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  check('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  check('dob')
    .notEmpty()
    .withMessage('Date of birth is required'),
  check('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['male', 'female'])
    .withMessage('Invalid gender'),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
      Patient.findOne({ email: val }).then((patient) => {
        if (patient) {
          return Promise.reject(new Error('Email already in use'));
        }
      })
    ),
  check('phone')
    .notEmpty()
    .withMessage('Phone number is required'),
  check('allergies')
    .optional()
    .isArray()
    .withMessage('Allergies must be an array'),
  check('city')
    .notEmpty()
    .withMessage('City is required'),
  validatorMiddleware,
];

exports.getPatientValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid patient ID format'),
  validatorMiddleware,
];

exports.updatePatientValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid patient ID format'),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val, { req }) =>
      Patient.findOne({ email: val }).then((patient) => {
        if (patient && patient.id !== req.params.id) {
          return Promise.reject(new Error('Email already in use'));
        }
      })
    ),
  validatorMiddleware,
];

exports.deletePatientValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid patient ID format'),
  validatorMiddleware,
];
