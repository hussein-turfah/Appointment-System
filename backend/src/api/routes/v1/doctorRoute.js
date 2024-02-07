const express = require('express');
const router = express.Router();
const {
  addDoctor,
  deleteDoctorById,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
} = require('../../controllers/doctorController');

// Route to add a new doctor
router.post('/doctors', addDoctor);

// Route to get all doctors
router.get('/doctors', getAllDoctors);

// Route to get a specific doctor by ID
router.get('/doctors/:id', getDoctorById);

// Route to update a specific doctor by ID
router.put('/doctors/:id', updateDoctorById);

// Route to delete a specific doctor by ID
router.delete('/doctors/:id', deleteDoctorById);

module.exports = router;

