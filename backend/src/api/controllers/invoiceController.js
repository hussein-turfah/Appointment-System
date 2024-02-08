const Invoice = require('../models/invoiceSchema');


const createInvoice = async (req, res) => {
    try {
      const {patientId} = req.params;
      const { doctorId, amount, currency,paymentStatus } = req.body;
  
      const newInvoice = new Invoice({
        patient: patientId,
        doctor: doctorId,
        amount: amount,
        currency: currency,
        paymentStatus: paymentStatus
      });
  
      await newInvoice.save();
  
      console.log('Invoice created successfully:', newInvoice);
      res.status(201).json(newInvoice);
    } catch (error) {
      console.error('Error creating invoice:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
// Update Invoice
const updateInvoice = async (req, res) => {
    try {
      const { invoiceId } = req.params;
      const { amount, currency, paymentStatus } = req.body;
  
      const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, {
        amount: amount,
        currency: currency,
        paymentStatus: paymentStatus
      }, { new: true });
  
      if (!updatedInvoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
  
      console.log('Invoice updated successfully:', updatedInvoice);
      res.status(200).json(updatedInvoice);
    } catch (error) {
      console.error('Error updating invoice:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Delete Invoice
  const deleteInvoice = async (req, res) => {
    try {
      const { invoiceId } = req.params;
  
      const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);
  
      if (!deletedInvoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
  
      console.log('Invoice deleted successfully:', deletedInvoice);
      res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
      console.error('Error deleting invoice:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Get Invoices By Patient ID
  const getInvoicesByPatientId = async (req, res) => {
    try {
      const { patientId } = req.params;
  
      const invoices = await Invoice.find({ patient: patientId });
  
      if (!invoices || invoices.length === 0) {
        return res.status(404).json({ message: 'Invoices not found for the patient.' });
      }
  
      console.log('Invoices retrieved successfully:', invoices);
      res.status(200).json(invoices);
    } catch (error) {
      console.error('Error retrieving invoices:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const getInvoiceById = async (req, res) => {
    try {
      const { invoiceId } = req.params;
  
      const invoice = await Invoice.findById(invoiceId);
  
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
  
      res.status(200).json(invoice);
    } catch (error) {
      console.error('Error retrieving invoice by ID:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Get Invoices By Doctor ID
  const getInvoicesByDoctorId = async (req, res) => {
    try {
      const { doctorId } = req.params;
  
      const invoices = await Invoice.find({ doctor: doctorId });
  
      if (!invoices || invoices.length === 0) {
        return res.status(404).json({ message: 'Invoices not found for the doctor.' });
      }
  
      res.status(200).json(invoices);
    } catch (error) {
      console.error('Error retrieving invoices by doctor ID:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const getInvoicesByDate = async (req, res) => {
    try {
      const { date } = req.params;
      const targetDate = new Date(date);
      const startDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
      const endDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1);
  
      // Find invoices for the target day
      const invoices = await Invoice.find({
        date: {
          $gte: startDate,
          $lt: endDate
        }
      });
  
      if (!invoices || invoices.length === 0) {
        return res.status(404).json({ message: 'No invoices found for the specified day.' });
      }
  
      res.status(200).json(invoices);
    } catch (error) {
      console.error('Error retrieving invoices for the day:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  
  
  module.exports = {
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoicesByPatientId,
    getInvoiceById,
    getInvoicesByDoctorId,
    getInvoicesByDate

  };