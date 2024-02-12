import React, { useState } from 'react';

function MedicalRecordsForm() {
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., saving data to a database
    console.log('Form submitted:', { doctorName, patientName, date, notes });
    // Clear form fields after submission
    setDoctorName('');
    setPatientName('');
    setDate('');
    setNotes('');
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
        <title>Medical Record</title>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 760px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          h2 {
            margin-top: 0;
            font-size: 1.5rem;
            text-align: center;
          }
          label {
            font-weight: bold;
          }
          p {
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Medical Record</h2>
          <p><strong>Doctor Name:</strong> ${doctorName}</p>
          <p><strong>Patient Name:</strong> ${patientName}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Info:</strong></p>
          <p>${notes}</p>
        </div>
      </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4">
      <h2 className="text-lg font-semibold text-gray-900 text-center">Medical Records</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Doctor Name:</label>
            <input
              type="text"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
              value={doctorName}
              onChange={(event) => setDoctorName(event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Patient Name:</label>
            <input
              type="text"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
              value={patientName}
              onChange={(event) => setPatientName(event.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-2 text-sm font-medium text-gray-700">Date:</label>
          <input
            type="date"
            className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="mb-2 text-sm font-medium text-gray-700">Info:</label>
          <textarea
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
            rows="5"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
      =
         
      </form>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 mr-2"
          onClick={handlePrint}
        >
          Print Medical Record
        </button>
      </div>
    </div>
  );
}

export default MedicalRecordsForm;

