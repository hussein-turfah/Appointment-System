import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../../actions/DoctorActions";
import Modal from "../../../common/Modal";
import InvoiceForm from "../../../common/EditInvoiceModal";
import { getAllPatients } from "../../../actions/PatientActions";


const InvoiceStatement = () => {
  const dispatch = useDispatch();
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const user = useSelector(({ UserData }) => UserData.data);
  const doctors = useSelector(({ DoctorData }) => DoctorData.allDoctors);

  useEffect(() => {
    dispatch(getAllDoctors());
    dispatch(getAllPatients());
  }, [dispatch]);

  const handlePrint = () => {
    
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <label className="mr-2">Select Doctor:</label>
          <select
            className="border rounded-md px-2 py-1"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">Select Doctor</option>
          
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Start Date:</label>
          <input
            type="date"
            className="border rounded-md px-2 py-1"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">End Date:</label>
          <input
            type="date"
            className="border rounded-md px-2 py-1"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className="p-4 ml-5 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-md px-5 py-1
            text-nowrap"  onClick={handlePrint}>
           Print
        </button>
        
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/* Table Headers */}
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
        {/* Table Body */}
        <tbody>
          {/* Render Table Rows Here */}
        </tbody>
      </table>

    </div>
  );
};

export default InvoiceStatement;
