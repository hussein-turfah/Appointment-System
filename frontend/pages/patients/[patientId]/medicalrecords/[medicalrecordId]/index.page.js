import React, { useState } from 'react';

const data = {
  attachments: [
    { id: 1, fileName: 'Attachment 1' },
    { id: 2, fileName: 'Attachment 2' },
  ],
  prescriptions: [
    { id: 1, medicationName: 'Medication 1' },
    { id: 2, medicationName: 'Medication 2' },
  ],
  fees: 100,
  currency: 'USD',
  date: new Date().toLocaleDateString(),
  description: 'Sample description',
};

const MedicalRecordDetails = () => {
  const [fees, setFees] = useState(data.fees);
  const [date, setDate] = useState(data.date);
  const [description, setDescription] = useState(data.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleFeesChange = (e) => {
    setFees(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    // Perform save action with updated data
    console.log('Data saved:', { fees, date, description });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handlePrint = () => {
    // Perform print action
    window.print();
  };

  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Medical Record Details</h2>

      <div className="flex items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Date:</h3>
        <span className="ml-4 text-gray-800">{new Date(date).toLocaleDateString()}</span>
      </div>

      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Description:</h3>
        <textarea
          rows="4"
          className="w-full border rounded-md p-2"
          value={description}
          onChange={handleDescriptionChange}
          disabled={!isEditing} // Disable textarea when not in edit mode
        />
      </div>

      <div className="space-y-4">
        {data.attachments?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Attachments:</h3>
            <ul className="list-disc pl-6">
              {data.attachments.map((attachment) => (
                <li key={attachment.id} className="text-blue-500 hover:underline">
                  {attachment.fileName}
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.prescriptions?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Prescriptions:</h3>
            <ul className="list-disc pl-6">
              {data.prescriptions.map((prescription) => (
                <li key={prescription.id} className="text-blue-500 hover:underline">
                  {prescription.medicationName}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-gray-800">Fees:</h3>
          <input
            type="number"
            className="ml-4 w-24 border rounded-md py-1 px-2"
            value={fees}
            onChange={handleFeesChange}
            disabled={!isEditing} 
          />
          <span className="ml-2 text-gray-800">{data.currency || 'USD'}</span>
        </div>

        <div className="flex justify-end">
          {!isEditing ? (
            <button
              className="bg-gray-800 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 mr-2"
              onClick={handleEdit}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 mr-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 mr-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          )}
          <button
            className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordDetails;
