const MedicalRecord = require('../models/medicalRecords');
const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: 'uploads/records',
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      const filename = `records-${uuidv4()}-${Date.now()}.${ext}`;
      cb(null, filename);
    },
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf' || file.mimetype === 'application/msword') {
      cb(null, true); // Allow image, PDF, and DOC files
    } else {
      cb(new Error('Only Images, PDFs, and DOCs Allowed'), false);
    }
  };

  const uploadImage = multer({ storage, fileFilter });
const uploadRecordAttach = uploadImage.single('attachment') ;

const createMedicalRecord = async (req, res) => {
    try {
      console.log(req.body)
      const { patientId } = req.params;
      const { title, notes } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: ' attachment is required' });
      }
      let attachment = null;
      if (req.file) {
      attachment = `/uploads/records/${req.file.filename}`;}

      const medicalRecordData = {
        patient: patientId,
        title: title,
        attachment: attachment,
        notes: notes
      };
  
      const newMedicalRecord = new MedicalRecord(medicalRecordData);
      await newMedicalRecord.save();
  
      console.log('Medical record created successfully:', newMedicalRecord);
      res.status(201).json(newMedicalRecord); 
    } catch (error) {
      console.error('Error creating medical record:', error);
      res.status(500).json({ message: 'Server Error' }); 
    }
  };


  const updateMedicalRecord = async (req, res) => {
    try {
      const { medicalRecordId } = req.params;
      const { title, notes, doctorId } = req.body;
  
      if (!title || !notes || !doctorId) {
        return res.status(400).json({ message: 'Title, notes, and doctorId are required.' });
      }
  
      let updateData = {
        title: title,
        notes: notes,
        doctor: doctorId,
      };
  
      // Check if attachment is being updated
      if (req.file) {
        updateData.attachment = `/uploads/records/${req.file.filename}`;
      }
  
      const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(
        medicalRecordId,
        updateData,
        { new: true }
      );
  
      if (!updatedMedicalRecord) {
        return res.status(404).json({ message: 'Medical record not found.' });
      }
  
      console.log('Medical record updated successfully:', updatedMedicalRecord);
      res.status(200).json(updatedMedicalRecord);
    } catch (error) {
      console.error('Error updating medical record:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const deleteMedicalRecord = async (req, res) => {
    try {
      const { medicalRecordId } = req.params;
  
      const deletedMedicalRecord = await MedicalRecord.findByIdAndDelete(medicalRecordId);
  
      if (!deletedMedicalRecord) {
        return res.status(404).json({ message: 'Medical record not found.' });
      }
  
      console.log('Medical record deleted successfully:', deletedMedicalRecord);
      res.status(200).json({ message: 'Medical record deleted successfully.' });
    } catch (error) {
      console.error('Error deleting medical record:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
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

module.exports = {createMedicalRecord,uploadRecordAttach,getMedicalRecordByPatientId,updateMedicalRecord ,deleteMedicalRecord,getMedicalRecordById}