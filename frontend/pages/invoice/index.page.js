import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvoices } from "../../actions/InvoiceActions";
import Modal from "../../common/Modal"; 
import InvoiceForm from "../../common/EditInvoiceModal"

const InvoiceTable = () => {
  const dispatch = useDispatch();
  const invoices = useSelector(({ InvoiceData }) => InvoiceData?.allInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State to store the selected invoice
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to control delete modal visibility

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  // Function to handle opening edit modal
  const openEditModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsEditModalOpen(true);
  };

  // Function to handle closing edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Function to handle opening delete modal
  const openDeleteModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDeleteModalOpen(true);
  };

  // Function to handle closing delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Patient Name
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Currency
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.data.map((invoice, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-b dark:bg-gray-800 dark:border-gray-700`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {`${invoice.patient.firstName} ${invoice.patient.lastName}`}
              </td>
              <td className="px-6 py-4"> {`${invoice.doctor.firstName} ${invoice.doctor.lastName}`}</td>
              <td className="px-6 py-4">{invoice.date}</td>
              <td className="px-6 py-4">{invoice.amount}</td>
              <td className="px-6 py-4">{invoice.currency}</td>
              <td className={`px-6 py-4 ${invoice.paymentStatus === 'Unpaid' ? 'text-red-500' : ''}`}>{invoice.paymentStatus}</td>
              <td className="px-6 py-4">
                <button onClick={() => openEditModal(invoice)} className="text-blue-600 dark:text-blue-500 hover:underline">
                  <i className="fas fa-edit mr-2"></i>Edit
                </button>
                <button onClick={() => openDeleteModal(invoice)} className="text-red-600 dark:text-red-500 hover:underline ml-2">
                  <i className="fas fa-trash-alt mr-2"></i>Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Invoice" content={<InvoiceForm invoice={selectedInvoice} onClose={closeEditModal} />} />

      {/* Delete Modal */}
      {/* <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Delete Invoice" content={<DeleteInvoiceConfirmation invoice={selectedInvoice} onClose={closeDeleteModal} />} /> */}
    </div>
  );
};

export default InvoiceTable;
