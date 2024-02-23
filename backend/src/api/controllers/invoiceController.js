const Invoice = require('../models/invoice.model');
const User = require('../models/user.model');

const createInvoice = async (req, res) => {
  try {
      const { patientId } = req.params;
      const { doctorId, amount, currency, paymentStatus } = req.body;

      // Retrieve doctor's information from the database
      const doctor = await User.findById(doctorId);
      if (!doctor || doctor.type !== 'doctor') {
          return res.status(404).json({ message: 'Doctor not found' });
      }

      // Calculate the doctor's amount considering the doctor's fee ratio
      const feeRatio = doctor.feeRatio;
      const clinicAmount = amount * (1 - feeRatio / 100); // Calculate the doctor's amount
      console.log(clinicAmount)

      // Calculate the clinic's amount (original amount minus doctor's amount)
      const doctorAmount = amount - clinicAmount;

      // Check if doctorAmount and clinicAmount are valid numbers
      if (isNaN(doctorAmount) || isNaN(clinicAmount) || doctorAmount < 0 || clinicAmount < 0) {
          return res.status(400).json({ message: 'Invalid amount calculation' });
      }

      // Create the new invoice with doctor and clinic amounts
      const newInvoice = new Invoice({
          patient: patientId,
          doctor: doctorId,
          amount: amount,
          doctorAmount: doctorAmount,
          clinicAmount: clinicAmount,
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

    // Retrieve existing invoice from the database
    let invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Retrieve doctor's information from the database
    const doctor = await User.findById(invoice.doctor);
    if (!doctor || doctor.type !== 'doctor') {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Calculate the doctor's amount considering the doctor's fee ratio
    const feeRatio = doctor.feeRatio;
    const clinicAmount = amount * (1 - feeRatio / 100); // Calculate the doctor's amount

    // Calculate the clinic's amount (original amount minus doctor's amount)
    const doctorAmount = amount - clinicAmount;

    // Check if doctorAmount and clinicAmount are valid numbers
    if (isNaN(doctorAmount) || isNaN(clinicAmount) || doctorAmount < 0 || clinicAmount < 0) {
      return res.status(400).json({ message: 'Invalid amount calculation' });
    }

    // Update the invoice with new amounts and other details
    invoice.amount = amount;
    invoice.doctorAmount = doctorAmount;
    invoice.clinicAmount = clinicAmount;
    invoice.currency = currency;
    invoice.paymentStatus = paymentStatus;

    // Save the updated invoice
    invoice = await invoice.save();

    console.log('Invoice updated successfully:', invoice);
    res.status(200).json(invoice);
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
  
      res.status(200).json(invoice)
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
  
  const getAllInvoices = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit; 

        const invoices = await Invoice.find().skip(skip).limit(limit).populate('patient').populate('doctor');

        if (!invoices || invoices.length === 0) {
            return res.status(404).json({ message: 'No invoices found' });
        }

        console.log('Invoices retrieved successfully:', invoices);
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error retrieving invoices:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getInvoicesAndTotal = async (req, res) => {
  try {
    const { doctorId, date } = req.params;
    let query = {};

    if (doctorId) {
      query.doctor = doctorId;
    }

    if (date) {
      const targetDate = new Date(date);
      const startDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
      const endDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1);
      query.date = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const invoices = await Invoice.find(query);

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ message: 'No invoices found.' });
    }

    const totalInvoices = invoices.length;
    const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);

    res.status(200).json({ invoices, totalInvoices, totalAmount });
  } catch (error) {
    console.error('Error retrieving invoices:', error);
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
    getInvoicesByDate,
    getAllInvoices,
    getInvoicesAndTotal
  };