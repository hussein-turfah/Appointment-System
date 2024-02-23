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
  getInvoicesAndTotal,
  getAllInvoicesByDoctor
} = require('../../controllers/invoiceController');

const {
  createInvoiceValidator,
  getInvoiceValidator,
  updateInvoiceValidator,
} = require('../../utils/validators/invoiceValidator');

router.post('/:patientId', createInvoiceValidator, createInvoice);
router.put('/:invoiceId', updateInvoiceValidator, updateInvoice);
router.delete('/:invoiceId', deleteInvoice);
router.get('/patient/:patientId', getInvoicesByPatientId);
router.get('/:invoiceId', getInvoiceValidator, getInvoiceById);
router.get('/day/:date', getInvoicesByDate);
router.get('/', getAllInvoices);
router.get('/doctor/all', getAllInvoicesByDoctor);
module.exports = router;

