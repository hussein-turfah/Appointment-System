const express = require('express');
const router = express.Router();

const {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoicesByPatientId,
  getInvoiceById,
  getInvoicesByDoctorId,
  getInvoicesByDate,
  getAllInvoices,
  getInvoicesAndTotal
} = require('../../controllers/invoiceController');

const {
  createInvoiceValidator,
  getInvoiceValidator,
  updateInvoiceValidator,
  deleteInvoiceValidator,
} = require('../../utils/validators/invoiceValidator');

router.post('/:patientId', createInvoiceValidator, createInvoice);
router.put('/:invoiceId', updateInvoiceValidator, updateInvoice);
router.delete('/:invoiceId', deleteInvoiceValidator, deleteInvoice);
router.get('/patient/:patientId', getInvoicesByPatientId);
router.get('/:invoiceId', getInvoiceValidator, getInvoiceById);
router.get('/:date/:doctorId?', getInvoicesAndTotal);
router.get('/doctor/:doctorId', getInvoicesByDoctorId);
router.get('/day/:date', getInvoicesByDate);
router.get('/',getAllInvoices);
module.exports = router;
