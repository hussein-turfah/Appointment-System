const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const DoctorSchedule = require('../../models/scheduleSchema');

exports.createDoctorScheduleValidator = [
  check('weekday')
    .notEmpty()
    .withMessage('Weekday is required'),
  check('startTime')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid start time format'),
  check('endTime')
    .notEmpty()
    .withMessage('End time is required')
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid end time format')
    .custom((endTime, { req }) => {
      const startTime = req.body.startTime;
      if (startTime >= endTime) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
  validatorMiddleware,
];

exports.updateDoctorScheduleValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid schedule ID format'),
  check('startTime')
    .optional()
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid start time format'),
  check('endTime')
    .optional()
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid end time format')
    .custom((endTime, { req }) => {
      const startTime = req.body.startTime || req.schedule.startTime;
      if (startTime >= endTime) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
  validatorMiddleware,
];

exports.deleteDoctorScheduleValidator = [
    check('id')
      .isMongoId()
      .withMessage('Invalid schedule ID format'),
    validatorMiddleware,
  ];
  
