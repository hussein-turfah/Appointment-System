import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatients } from "../../actions/PatientActions";
import Modal from "../../common/Modal";
import CreatePatientModal from "../../common/CreatePatientModal";
import { deleteUser, getAllUsers } from "../../actions/AdminActions";
import { getAllDoctors } from "../../actions/DoctorActions";
import CreateUserModal from "../../common/CreateUserModal";

const UsersTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const user = useSelector(({ UserData }) => UserData.data);
  const [selectedUser, setSelectedUser] = useState({});

  const data = useSelector(({ AdminData }) => AdminData.allUsers);

  useEffect(() => {
    if (user.role === "admin") dispatch(getAllUsers());
    else if (user.role === "secretary") dispatch(getAllDoctors());
  }, [dispatch, user.role]);

  return (
    <div className="flex flex-col w-full justify-end overflow-x-auto shadow-md sm:rounded-lg mt-20">
      {/* {(user.role === "admin" || user.role === "secretary") && (
        <div className="flex p-4 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-lg mb-10 w-40">
          <button onClick={() => setModal(true)}>Create Doctor</button>
        </div>
      )} */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Doctor
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              {user.role === "admin" && "Actions"}
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((mUser, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b dark:bg-gray-800 dark:border-gray-700`}
                // onClick={() => router.push(`/patients/${user.id}`)}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {mUser.firstName} {mUser.lastName}
                </td>
                <td className="px-6 py-4">{mUser.email}</td>
                <td className="px-6 py-4">{mUser.phone}</td>
                <td className="px-6 py-4">{mUser.type}</td>
                <td className="px-6 py-4">
                  {user.role === "admin" && (
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => {
                        setModal(true);
                        setSelectedUser(mUser);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                  {user.role === "admin" && (
                    <button
                      onClick={() => {
                        dispatch(deleteUser(mUser.id));
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        active={modal}
        setActive={setModal}
        title="Edit User"
        children={
          <CreateUserModal
            open={modal}
            setOpen={setModal}
            data={selectedUser}
            editing
          />
        }
      />
    </div>
  );
};

export default UsersTable;
