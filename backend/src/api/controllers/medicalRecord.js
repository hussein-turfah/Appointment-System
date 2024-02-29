const MedicalRecord = require('../models/medicalRecords');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: 'uploads/records',
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const filename = `records-${uuidv4()}.${ext}`;
    cb(null, filename);
  },
});

// Multer file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Allow specified file types
  } else {
    cb(new Error('Only Images, PDFs, and DOCs Allowed'));
  }
};

// Multer instance for uploading attachment
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Middleware to handle file upload
const uploadRecordAttach = upload.single('attachment');

// Function to create a medical record
// Function to create a medical record
const createMedicalRecord = async (req, res) => {
  try {
    const { title, notes } = req.body; 
    const {patientId} = req.params;

    const medicalRecordData = {
      patient: patientId,
      title: title,
      notes: notes,
      date: Date.now(),
    };

    const newMedicalRecord = new MedicalRecord(medicalRecordData);
    await newMedicalRecord.save();

    console.log('Medical record created successfully:', newMedicalRecord);
    
    res.status(201).json({ message: 'Medical record created successfully', medicalRecord: newMedicalRecord });
  } catch (error) {

    console.error('Error creating medical record:', error);
    res.status(500).json({ message: 'Failed to create medical record' });
  }
};


// Function to add fees to a medical record
const addFeesToMedicalRecord = async (req, res) => {
  try {
    const { medicalRecordId, fees } = req.body;
    
    const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(
      medicalRecordId,
      { $set: { fees: fees } },
      { new: true }
    );
    
    console.log('Fees added to medical record:', updatedMedicalRecord);
    res.status(200).json(updatedMedicalRecord);
  } catch (error) {
    console.error('Error adding fees to medical record:', error);
    res.status(500).json({ message: 'Failed to add fees to medical record' });
  }
};

// Function to add prescriptions to a medical record
const addPrescriptionsToMedicalRecord = async (req, res) => {
  try {
    const { medicalRecordId, prescriptions } = req.body;
    
    const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(
      medicalRecordId,
      { $push: { prescriptions: prescriptions } },
      { new: true }
    );
    
    console.log('Prescriptions added to medical record:', updatedMedicalRecord);
    res.status(200).json(updatedMedicalRecord);
  } catch (error) {
    console.error('Error adding prescriptions to medical record:', error);
    res.status(500).json({ message: 'Failed to add prescriptions to medical record' });
  }
};

// Function to upload attachment to a specific medical record
const uploadAttachmentToMedicalRecord = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;

    // Check if medical record exists
    const medicalRecord = await MedicalRecord.findById(medicalRecordId);
    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    // Middleware to handle file upload
    uploadRecordAttach(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'Attachment is required' });
      }

      // Update attachment path in the medical record
      medicalRecord.attachment = req.file.path;
      await medicalRecord.save();

      res.status(200).json({ message: 'Attachment uploaded successfully', attachmentPath: medicalRecord.attachment });
    });
  } catch (error) {
    console.error('Error uploading attachment:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to delete a medical record
const deleteMedicalRecord = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;
    const deletedRecord = await MedicalRecord.findByIdAndDelete(medicalRecordId);
    
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    console.log('Medical record deleted successfully:', deletedRecord);
    res.status(200).json({ message: 'Medical record deleted successfully' });
  } catch (error) {
    console.error('Error deleting medical record:', error);
    res.status(500).json({ message: 'Failed to delete medical record' });
  }
};

// Function to update a medical record
const updateMedicalRecord = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;
    const { patient, title, notes } = req.body;
    
    const updatedRecord = await MedicalRecord.findByIdAndUpdate(
      medicalRecordId,
      { patient, title, notes },
      { new: true }
    );
    
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    console.log('Medical record updated successfully:', updatedRecord);
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error('Error updating medical record:', error);
    res.status(500).json({ message: 'Failed to update medical record' });
  }
};

// Function to get a medical record by ID
const getMedicalRecordById = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;

    const medicalRecord = await MedicalRecord.findById(medicalRecordId);

    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical record not found.' });
    }

    console.log('Medical record retrieved successfully:', medicalRecord);
    res.status(200).json(medicalRecord);
  } catch (error) {
    console.error('Error retrieving medical record:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to get medical records by patient ID
const getMedicalRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const medicalRecords = await MedicalRecord.find({ patient: patientId });

    if (!medicalRecords || medicalRecords.length === 0) {
      return res.status(404).json({ message: 'Medical records not found for the patient.' });
    }

    console.log('Medical records retrieved successfully:', medicalRecords);
    res.status(200).json(medicalRecords);
  } catch (error) {
    console.error('Error retrieving medical records:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createMedicalRecord, uploadRecordAttach, getMedicalRecordByPatientId, deleteMedicalRecord, updateMedicalRecord, getMedicalRecordById, addFeesToMedicalRecord, addPrescriptionsToMedicalRecord };
