import React from 'react';

const DetailedMedicalRecordPrint = ({ medicalRecord }) => {
  return (
    <div className="print-template">
      <h1>{medicalRecord.title}</h1>
      <p>Description: {medicalRecord.description}</p>
      <p>Fees: {medicalRecord.fees}</p>
      <h2>Prescriptions:</h2>
      <ul>
        {medicalRecord.prescriptions.map((prescription, index) => (
          <li key={index}>{prescription}</li>
        ))}
      </ul>
      <h2>Attachments:</h2>
      {medicalRecord.attachments.map((attachment, index) => (
        <div key={index} className="attachment">
          <img src={attachment.url} alt={attachment.name} />
        </div>
      ))}
      <button onClick={() => window.print()}>Print</button>
    </div>
  );
};

export default DetailedMedicalRecordPrint;
