import { use, useEffect, useState } from "react";
import CreatePrescriptionModal from "../../../../../common/CreatPrescriptionModal";
import Modal from "../../../../../common/Modal";
import CreateInvoiceModal from "../../../../../common/EditInvoiceModal";
import { useRouter } from "next/router";

const Medicalrecords = ({ data }) => {
  const router = useRouter();

  const [prescriptionModal, setPrescriptionModal] = useState(false);
  const [attachModal, setAttachModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);

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
    <div className=" mx-auto w-11/12">
      <div className="flex items-center justify-between mb-4">
        <h1 className="mb-2 text">Medical Records</h1>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5"
          onClick={(e) => {
            if (selectedRecords.length === data.length) {
              setSelectedRecords([]);
            } else {
              setSelectedRecords(data.map((record) => record._id));
            }
          }}
          checked={selectedRecords.length === data.length}
        />
      </div>
      <div>
        {data.map((record, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-6 mb-4 cursor-pointer"
            onClick={() => {
              router.push(
                `/patients/${router.query.patientId}/medicalrecords/${record._id}`
              );
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrescriptionModal();
                  }}
                  className="border border-black text-black font-bold py-1 px-2 rounded mr-2"
                >
                  Prescriptions
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAttachModal();
                  }}
                  className="border border-black text-black font-bold py-1 px-2 rounded"
                >
                  Attach
                </button>
              </div>
              <div>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 mr-2"
                  id="attachCheckbox"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRecords((prev) => {
                      if (prev.includes(record._id)) {
                        return prev.filter((id) => id !== record._id);
                      }
                      return [...prev, record._id];
                    });
                  }}
                  checked={selectedRecords?.includes(record._id)}
                />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <h2 className="text-xl font-semibold">Record #{index + 1}</h2>
                <h3 className="text-gray-500">
                  {record?.date.toString().slice(0, 10)}
                </h3>
              </div>
              <p className="flex-1 text-gray-700">
                <span className="font-semibold">Title:</span> {record?.title}
                {record?.description && (
                  <p>
                    <span className="font-semibold">Description:</span>{" "}
                    {record?.description}
                  </p>
                )}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex items-center justify-between">
              <button className="border border-black text-black font-bold py-1 px-2 rounded mr-2">
                {record?.fees ? `Fees: ${record?.fees}` : "No fees associated"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleInvoiceModal();
                }}
                className="border border-black text-black font-bold py-1 px-2 rounded"
              >
                Create Invoice
              </button>
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
