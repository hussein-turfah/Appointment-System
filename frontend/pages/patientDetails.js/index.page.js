// PatientDetailsPage.jsx
import React from 'react';
import PatientDetails from './PatientDetails';
import MedicalRecords from './MedicalRecords';
import Prescriptions from './Prescriptions';

const PatientDetailsPage = () => {
  // Sample patient data
  const patient = {
    firstName: 'John',
    lastName: 'Doe',
    dob: '1990-01-01',
    gender: 'male',
    email: 'john.doe@example.com',
    phone: '1234567890',
    medicalRecords: [
      { recordType: 'Type A', date: '2023-12-15', doctor: 'Dr. Smith', description: 'Description of medical record A' },
      { recordType: 'Type B', date: '2024-01-20', doctor: 'Dr. Johnson', description: 'Description of medical record B' }
    ],
    prescriptions: [
      { medication: 'Medication A', dosage: '10mg', frequency: 'Twice daily' },
      { medication: 'Medication B', dosage: '20mg', frequency: 'Once daily' }
    ]
  };

  return (
    <div>
      <PatientDetails patient={patient} />
      <MedicalRecords medicalRecords={patient.medicalRecords} />
      <Prescriptions prescriptions={patient.prescriptions} />
    </div>
  );
};

export default PatientDetailsPage;
