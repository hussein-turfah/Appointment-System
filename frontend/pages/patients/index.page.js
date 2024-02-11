import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatients } from "../../actions/PatientActions";
import Modal from "../../common/Modal";
import CreatePatientModal from "../../common/CreatePatientModal";

const PatientsTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const allPatients = useSelector(({ PatientData }) => PatientData?.allPatients?.data?.data);

  useEffect(() => {
    dispatch(getAllPatients());
  }, [dispatch]);


  return (
    <div className="
    flex flex-col w-full justify-end overflow-x-auto shadow-md sm:rounded-lg mt-20">
      <div
        // className=
        // make it as a button above the table
        className="flex p-4 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-lg mb-10 w-40"
      >
        <button>
          Create Patient
        </button>

      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Patient
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {allPatients.map((patient, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-b dark:bg-gray-800 dark:border-gray-700`}
              onClick={() => router.push(`/patients/${patient.id}`)}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {patient.firstName} {patient.lastName}
              </td>
              <td className="px-6 py-4">{patient.email}</td>
              <td className="px-6 py-4">{patient.phone}</td>
              <td className="px-6 py-4">{patient.gender}</td>
              <td className="px-6 py-4">{patient.city}</td>
              <td className="px-6 py-4"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        active={true}
        setActive={() => {}}
        title="Create Patient"
        children={ <CreatePatientModal />
        }
      />
    </div>
  );
};

export default PatientsTable;
