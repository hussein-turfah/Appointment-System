import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInvoice,
  getAllInvoices,
  getInvoicesByDoctorId,
} from "../../actions/InvoiceActions";
import Modal from "../../common/Modal";
import InvoiceForm from "../../common/EditInvoiceModal";
import { getAllPatients } from "../../actions/PatientActions";
import Link from "next/link";

const InvoiceTable = () => {
  const dispatch = useDispatch();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const user = useSelector(({ UserData }) => UserData.data);

  // const invoices = useSelector(
  //   ({ InvoiceData }) =>
  //     InvoiceData?.allInvoices || InvoiceData?.invoicesByDoctor
  // );

  const allInvoices = useSelector(
    ({ InvoiceData }) => InvoiceData?.allInvoices?.data
  );
  const invoicesByDoctor = useSelector(
    ({ InvoiceData }) => InvoiceData?.invoicesByDoctor?.data
  );

  useEffect(() => {
    if (user.role === "admin") {
      dispatch(getAllInvoices());
    } else {
      dispatch(getInvoicesByDoctorId(user._id));
    }
    dispatch(getAllPatients());
  }, [dispatch, user]);

  useEffect(() => {
    if (user.role === "admin") {
      setInvoices(allInvoices);
    } else {
      setInvoices(invoicesByDoctor);
    }
  }, [allInvoices, invoicesByDoctor, user]);

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
    <div className="relative overflow-x-auto  sm:rounded-lg mt-20">
      <Link href="/invoice/statment">
        <button
          className="p-4 ml-5 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-lg mb-4
            text-nowrap"
        >
          Statement
        </button>
      </Link>
      <table className="w-full shadow-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
              Doctor Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Clinic Amount
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
            {user.role === "admin" && (
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {invoices?.map((invoice, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-b dark:bg-gray-800 dark:border-gray-700`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {`${invoice.patient.firstName} ${invoice.patient.lastName}`}
              </td>
              <td className="px-6 py-4">
                {" "}
                {`${invoice.doctor.firstName} ${invoice.doctor.lastName}`}
              </td>
              <td className="px-6 py-4">
                {new Date(invoice.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{invoice.doctorAmount}</td>
              <td className="px-6 py-4">{invoice.clinicAmount}</td>
              <td className="px-6 py-4">{invoice.amount}</td>
              <td className="px-6 py-4">{invoice.currency}</td>
              <td
                className={`px-6 py-4 ${
                  invoice.paymentStatus === "Unpaid" ? "text-red-500" : ""
                }`}
              >
                {invoice.paymentStatus}
              </td>
              {user.role === "admin" && (
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedInvoice(invoice);
                      setIsEditModalOpen(true);
                    }}
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <i className="fas fa-edit mr-2"></i>Edit
                  </button>
                  <button
                    onClick={() => {
                      dispatch(deleteInvoice(invoice._id));
                    }}
                    className="text-red-600 dark:text-red-500 hover:underline ml-2"
                  >
                    <i className="fas fa-trash-alt mr-2"></i>Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal
        active={isEditModalOpen}
        setActive={setIsEditModalOpen}
        title="Edit Invoice"
        children={
          <InvoiceForm
            initialValues={selectedInvoice}
            setInvoiceModal={setIsEditModalOpen}
            editing
          />
        }
      />

      {/* Delete Modal */}
      {/* <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Delete Invoice" content={<DeleteInvoiceConfirmation invoice={selectedInvoice} onClose={closeDeleteModal} />} /> */}
    </div>
  );
};

export default InvoiceTable;
