import { useState } from 'react';
import CreatePrescriptionModal from '../../../../../common/CreatPrescriptionModal';
import Modal from "../../../../../common/Modal";
import CreateInvoiceModal from '../../../../../common/EditInvoiceModal';

const Medicalrecords = ({ data }) => {
  const [prescriptionModal, setPrescriptionModal] = useState(false);
  const [attachModal, setAttachModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);

  const handlePrescriptionModal = () => {
    setPrescriptionModal(true);
  };

  const handleAttachModal = () => {
    setAttachModal(true);
  };

  const handleInvoiceModal = () => {
    setInvoiceModal(true);
  };

  return (
    <div className=" mx-auto">
      <h1 className="mb-2 text">Medical Records</h1>
      <div>
        {data.map((record, index) => (
          <div key={index} className="bg-white shadow-md rounded-md p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <button onClick={handlePrescriptionModal} className="border border-black text-black font-bold py-1 px-2 rounded mr-2">Prescriptions</button>
                <button onClick={handleAttachModal} className="border border-black text-black font-bold py-1 px-2 rounded">Attach</button>
              </div>
              <div>
                <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" id="attachCheckbox" />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <h2 className="text-xl font-semibold">Record #{index + 1}</h2>
                <h3 className="text-gray-500">{record?.date.toString().slice(0, 10)}</h3>
              </div>
              <p className="flex-1 text-gray-700">
                Indicates well-controlled chronic conditions and regular follow-up with his healthcare provider for ongoing management and monitoring
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex items-center justify-between">
              <button className="border border-black text-black font-bold py-1 px-2 rounded mr-2">Fees</button>
              <button onClick={handleInvoiceModal} className="border border-black text-black font-bold py-1 px-2 rounded">Create Invoice</button>
            </div>
            <p className="mt-4 text-gray-700">{record?.notes}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button className="text-blue-500 hover:text-blue-700">View all</button>
      </div>
      <Modal
        active={prescriptionModal}
        setActive={setPrescriptionModal}
        title="Create Prescription"
        children={<CreatePrescriptionModal />}
      />
      <Modal active={attachModal} setActive={setAttachModal} />
      <Modal
        active={invoiceModal}
        setActive={setInvoiceModal}
        title="Create Invoice"
        children={<CreateInvoiceModal />}
      />
    </div>
  );
};

export default Medicalrecords;


