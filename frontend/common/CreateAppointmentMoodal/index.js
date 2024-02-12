import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../actions/AppointmentActions";
import Dropdown from "../Dropdown";

export default function CreateAppointmentModal({ active, setActive}) {
  const dispatch = useDispatch();
  const allDoctors = useSelector(({ DoctorData }) => DoctorData.allDoctors);
  const allPatients = useSelector(
    ({ PatientData }) => PatientData.allPatients?.data
  );
  const [formData, setFormData] = useState({
    doctor: allDoctors?.data[0]?.id,
    patient: "",
    date: "",
    start: "",
    end: "",
    reason: "",
  });

  const create = useCallback(() => {
    dispatch(createAppointment(formData));
  }, [dispatch, formData]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        create();
        setActive(false);
      }}
    >
      <h3 className="mb-3 font-semibold">Appointment Details</h3>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Doctor
        </label>
        <Dropdown
          value={
            formData.doctor
              ? allDoctors.data?.filter(
                  (doctor) => doctor.id === formData?.doctor
                )[0]?.firstName +
                " " +
                allDoctors.data.filter(
                  (doctor) => doctor.id === formData.doctor
                )[0]?.lastName
              : ""
          }
          values={allDoctors.data.map(
            (doctor) => doctor.firstName + " " + doctor.lastName
          )}
          setValue={(value) =>
            setFormData({
              ...formData,
              doctor: allDoctors.data.filter(
                (doctor) => doctor.firstName + " " + doctor.lastName === value
              )[0]?.id,
            })
          }
        />
        {/* <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label text-center"
          >
            Date
          </label>
          <input
            type="date"
            className="form-control text-center w-50 mx-auto mb-3 w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            id="exampleFormControlInput1"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div> */}
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Start Time
          </label>
          <input
            type="datetime-local"
            className="form-control text-center w-50 mx-auto mb-3 w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            id="exampleFormControlInput1"
            value={formData.start}
            onChange={(e) =>
              setFormData({ ...formData, start: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            End Time
          </label>
          <input
            type="datetime-local"
            className="form-control text-center w-50 mx-auto mb-3 w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            id="exampleFormControlInput1"
            value={formData.end}
            onChange={(e) => setFormData({ ...formData, end: e.target.value })}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Description
        </label>
        <textarea
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          className="form-control w-50 mx-auto mb-3 w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <h4 className="mb-3 font-semibold">Patient Details</h4>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Patient Name
        </label>
        <Dropdown
          value={
            formData.patient
              ? allPatients?.data?.filter(
                  (patient) => patient.id === formData?.patient
                )[0]?.firstName +
                " " +
                allPatients?.data.filter(
                  (patient) => patient.id === formData.patient
                )[0]?.lastName
              : ""
          }
          values={
            Array.isArray(allPatients?.data) &&
            allPatients?.data?.map(
              (patient) => patient.firstName + " " + patient.lastName
            )
          }
          setValue={(value) =>
            setFormData({
              ...formData,
              patient: allPatients.data.filter(
                (patient) =>
                  patient.firstName + " " + patient.lastName === value
              )[0]?.id,
            })
          }
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-50 mx-auto mb-3 w-full border-2 bg-gray-500 text-white border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      >
        Submit
      </button>
    </form>
  );
}
