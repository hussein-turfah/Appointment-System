const express = require('express');
const router = express.Router();

// Import your model and functions
const {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoicesByPatientId,
  getInvoiceById,
  getInvoicesByDoctorId,
  getInvoicesForDay
} = require('../../controllers/invoiceController'); 

// Routes
router.post('/:patientId', createInvoice);
router.put('/:invoiceId', updateInvoice);
router.delete('/:invoiceId', deleteInvoice);
router.get('/patient/:patientId', getInvoicesByPatientId);
router.get('/:invoiceId', getInvoiceById);
router.get('/doctor/:doctorId', getInvoicesByDoctorId);
// router.get('/day', getInvoicesForDay);

module.exports = router;