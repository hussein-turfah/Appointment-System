import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../../actions/DoctorActions";
import Modal from "../../../common/Modal";
import InvoiceForm from "../../../common/EditInvoiceModal";
import { getAllPatients } from "../../../actions/PatientActions";
import { useRouter } from "next/router";
import Dropdown from "../../../common/Dropdown";

const InvoiceStatement = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userLoaded, setUserLoaded] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const doctors = useSelector(({ DoctorData }) => DoctorData.allDoctors?.data);

  const user = useSelector(({ UserData }) => UserData.data);

  const [formData, setFormData] = useState({
    selectedDoctor: "",
    startDate: "",
    endDate: "",
  });
  const { selectedDoctor, startDate, endDate } = formData;

  const handlePrint = () => {
    console.log("Print");
  };

  const handleGetInvoices = () => {
    console.log("Get Invoices");
  };

  useEffect(() => {
    dispatch(getAllDoctors());
    dispatch(getAllPatients());
  }, [dispatch]);

  useEffect(() => {
    if (userLoaded) {
      if (user?.role !== "admin" && user?.role !== "secretary") {
        router.push("/404");
      }
    }
  }, [userLoaded]);

  useEffect(() => {
    if (user?._id) {
      setUserLoaded(true);
    }
  }, [user]);

  return (
    <div className="relative shadow-md sm:rounded-lg mt-20">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <label className="mr-2">Doctor:</label>
          <Dropdown
            values={[
              ...doctors.map((doctor) => ({
                value: doctor._id,
                label: `${doctor.firstName} ${doctor.lastName}`,
              })),
            ]}
            value={
              selectedDoctor
                ? {
                    value: selectedDoctor,
                    label:
                      doctors.find((doctor) => doctor === selectedDoctor)
                        ?.firstName +
                      " " +
                      doctors.find((doctor) => doctor === selectedDoctor)
                        ?.lastName,
                  }
                : null
            }
            setValue={(selectedDoctor) => {
              const doctor = doctors.find((doc) => doc._id === selectedDoctor);
              setFormData({ ...formData, selectedDoctor: doctor });
            }}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Start Date:</label>
          <input
            type="date"
            className="border rounded-md px-2 py-1"
            value={startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">End Date:</label>
          <input
            type="date"
            className="border rounded-md px-2 py-1"
            value={endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
          />
        </div>
        <button
          className="p-4 ml-5 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-md px-5 py-1
            text-nowrap"
          onClick={handleGetInvoices}
        >
          Get All Invoices
        </button>
        <button
          className="p-4 ml-5 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-md px-5 py-1
            text-nowrap"
          onClick={handlePrint}
        >
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
        <tbody>{/* Render Table Rows Here */}</tbody>
      </table>
    </div>
  );
};

export default InvoiceStatement;
