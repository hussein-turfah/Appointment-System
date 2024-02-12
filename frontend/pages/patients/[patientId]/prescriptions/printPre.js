import React, { useState } from 'react';

function AddPrescriptionForm() {
  const [prescriptions, setPrescriptions] = useState([]); // Array of objects with { medication, dosage, instructions }
  const [newMedication, setNewMedication] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newInstructions, setNewInstructions] = useState('');

  const handleAddMedication = () => {
    const newMedicationData = {
      medication: newMedication,
      dosage: newDosage,
      instructions: newInstructions,
    };
    setPrescriptions([...prescriptions, newMedicationData]); // Add new medication to list
    setNewMedication(''); // Clear form fields
    setNewDosage('');
    setNewInstructions('');
  };

  const handleRemoveMedication = (index) => {
    const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updatedPrescriptions);
  };

  const handlePrint = () => {
    // Open a new window with the content formatted for printing
    const win = window.open("");
    win.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Prescription Form</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f8f9fa; /* Bootstrap default background color */
        }
    
        .prescription-form {
          max-width: 720px; /* Consider a more flexible width */
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border: 1px solid lightgrey;
          border-radius: 5px; /* Add subtle rounded corners */
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
        }
    
        .header {
          display: flex; /* Arrange logo and details side-by-side */
          justify-content: space-between; /* Align items properly */
          align-items: center;
          padding: 10px 20px;
          border-bottom: 1px solid lightgrey;
        }
    
        .logo img {
          width: 100px; /* Adjust image size */
          height: 100px;
        }
    
        .patient-details {
          font-weight: bold;
          margin-bottom: 10px;
        }
    
        .credentials {
          text-align: right; /* Align doctor details to the right */
        }
    
        .section {
          padding: 20px; /* Provide more space around medication details */
        }
    
        .med-item {
          display: flex; /* Arrange medication details horizontally */
          justify-content: space-between; /* Align items properly */
          align-items: center;
          margin-bottom: 10px;
          border-bottom: 1px solid #ddd;
        }
    
        .med-item:last-child {
          border-bottom: none;
        }
    
        .med-item strong {
          font-weight: bold;
        }
    
        .signature {
          padding: 20px;
          border-top: 1px solid lightgrey;
        }
    
        @media (max-width: 768px) { /* Responsive adjustments for smaller screens */
          .prescription-form {
            max-width: 100%;
          }
          .header {
            flex-direction: column;
            align-items: center;
          }
          .logo img {
            margin-bottom: 10px;
          }
          .credentials {
            text-align: center;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="prescription-form">
          <div class="header">
            <div class="logo">
              <img src="https://seeklogo.com/images/H/hospital-clinic-plus-logo-7916383C7A-seeklogo.com.png" alt="Hospital Logo">
            </div>
            <div class="credentials">
              <h4>Doctor Name</h4>
              <p>Chamber Name</p>
              <p>Address</p>
              <p>Mb. 0XXXXXXXXX</p>
            </div>
          </div>
    
          <div class="section">
            <h2>Prescription</h2>
            <div class="patient-details">
              <strong>Patient Name:</strong> [Patient Name]
            </div>
            <ul className="med-list">
            ${prescriptions.map((medication) => `
                <li key={index} className="med-item">
                  <strong>Medication:</strong> ${medication.medication}
                  <br />
                  <strong>Dosage:</strong> ${medication.dosage}
                  <br />
                  <strong>Instructions:</strong> ${medication.instructions}
                </li>`)}
            </ul>
          </div>          
          <div class="signature">
            <p>Prescribed by: Dr. John Doe</p>
            <div class="signature-line">
              <p>Signature:</p>
              <hr> </div>
            <p>Date: February 10, 2024</p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `);
    win.document.close(); 
  }; 
  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4">
      <h2 className="text-lg font-semibold text-gray-900 text-center">Add Prescriptions</h2>
      <div className="mt-4">
        {prescriptions.length > 0 && (
          <ul className="list-none px-2">
            {prescriptions.map((medication, index) => (
              <li key={index} className="flex items-center justify-between py-2 border-b">
                <span className="flex-grow mr-4">{medication.medication} ({medication.dosage})</span>
                <span>{medication.instructions}</span>
                <button
                  type="button"
                  className="text-red-500 hover:underline ml-2"
                  onClick={() => handleRemoveMedication(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Medication:</label>
            <input
              type="text"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
              value={newMedication}
              onChange={(event) => setNewMedication(event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Dosage:</label>
            <input
              type="text"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
              value={newDosage}
              onChange={(event) => setNewDosage(event.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-2 text-sm font-medium text-gray-700">Instructions:</label>
          <textarea
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
            rows="5"
            value={newInstructions}
            onChange={(event) => setNewInstructions(event.target.value)}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2"
            onClick={handleAddMedication}
          >
            Add Medication
          </button>
        </div>
      </form>
      <div className="flex justify-end mt-4">
  <button
    type="button"
    className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 mr-2"
    onClick={handlePrint}
  >
    Print Prescriptions
  </button>
</div>
    </div>
  );
            };
export default AddPrescriptionForm;