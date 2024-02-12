import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../actions/AppointmentActions";
import Dropdown from "../Dropdown";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import Input from "../Input";

export default function CreateAppointmentModal({ active, setActive }) {
  const dispatch = useDispatch();

  const [oldPatient, setOldPatient] = useState(false);

  const allDoctors = useSelector(({ DoctorData }) => DoctorData.allDoctors);
  const allPatients = useSelector(
    ({ PatientData }) => PatientData.allPatients?.data
  );
  const [formData, setFormData] = useState({
    doctor: `${allDoctors?.data[0]?.id}`,
    patient: "",
    date: "",
    start: "",
    end: "",
    reason: "",
    newPatient: !oldPatient,
  });

  const [newPatientData, setNewPatientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
  });

  const create = useCallback(async () => {
    await dispatch(createAppointment({ ...formData, ...newPatientData }));
  }, [dispatch, formData, newPatientData]);

  const age = (newPatientData) => {
    const dob = new Date(newPatientData.dob);
    const now = new Date();
    const ageInYears = now.getFullYear() - dob.getFullYear();
    const ageInMonths = now.getMonth() - dob.getMonth();
    const ageInDays = now.getDate() - dob.getDate();
    const ageInHours = Math.floor((now - dob) / (1000 * 60 * 60));
    const ageInWeeks = Math.floor(ageInDays / 7);

    if (ageInYears > 1) {
      return `${ageInYears} years`;
    } else if (ageInYears === 1) {
      return `${ageInYears} year`;
    } else if (ageInMonths > 0) {
      return `${ageInMonths} months`;
    } else if (ageInDays > 0) {
      return `${ageInDays} days`;
    } else if (ageInHours > 0) {
      return `${ageInHours} hours`;
    } else if (ageInWeeks > 0) {
      return `${ageInWeeks} weeks`;
    } else {
      return "";
    }
  };

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
      <div className={styles.selector}>
        <div
          className={classNames({
            [styles.item]: true,
            [styles.active]: oldPatient,
          })}
          onClick={() => setOldPatient(true)}
        >
          Old Patient
        </div>
        <div
          className={classNames({
            [styles.item]: true,
            [styles.active]: !oldPatient,
          })}
          onClick={() => setOldPatient(false)}
        >
          New Patient
        </div>
      </div>

      {oldPatient ? (
        <div className="mb-3 mt-3">
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
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="title">First Name</label>
                <Input
                  type="text"
                  id="title"
                  className="border border-gray-300 rounded-lg"
                  value={newPatientData.firstName}
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      firstName: value,
                    }));
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title">Last Name</label>
                <Input
                  type="text"
                  id="title"
                  className="border border-gray-300 rounded-lg"
                  value={newPatientData.lastName}
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      lastName: value,
                    }));
                  }}
                  required
                />
              </div>
            </div>
            <div className="flex gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="title">Email</label>
                <Input
                  type="text"
                  id="title"
                  className="border border-gray-300 rounded-lg"
                  value={newPatientData.email}
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      email: value,
                    }));
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title">Phone</label>
                <Input
                  type="number"
                  id="title"
                  className="border border-gray-300 rounded-lg"
                  value={newPatientData.phone}
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      phone: value,
                    }));
                  }}
                  required
                />
              </div>
            </div>
            <div className={styles.dobG}>
              <div className="flex flex-col gap-1">
                <div className={styles.row}>
                  <div className={styles.dob}>
                    <h4>Date of Birth</h4>
                    {age(newPatientData) === "" ? null : (
                      <h6>
                        <span>Age:</span> {age(newPatientData)}
                      </h6>
                    )}
                  </div>
                  <p>
                    <Input
                      type="date"
                      value={
                        newPatientData?.dob?.toString().slice(0, 10) ||
                        new Date().toISOString().slice(0, 10)
                      }
                      placeholder=""
                      setValue={(value) => {
                        setNewPatientData((prev) => ({
                          ...prev,
                          dob: value,
                        }));
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className={styles.gender}>
                <h4>Gender</h4>
                <div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={newPatientData.gender === "male"}
                      onChange={(e) => {
                        setNewPatientData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }));
                      }}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      checked={newPatientData.gender === "female"}
                      onChange={(e) => {
                        setNewPatientData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }));
                      }}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="title">City</label>
              <Input
                type="text"
                value={newPatientData.city}
                placeholder=""
                setValue={(value) => {
                  setNewPatientData((prev) => ({
                    ...prev,
                    city: value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      )}
      <button
        type="submit"
        className="btn btn-primary w-50 mx-auto mb-3 w-full border-2 bg-gray-500 text-white border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      >
        Submit
      </button>
    </form>
  );
}
