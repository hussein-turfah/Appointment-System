import { useCallback, useState } from "react";
import Input from "../Input";
import { useDispatch } from "react-redux";
import { createPatient } from "../../actions/PatientActions";
import styles from "./styles/index.module.scss";

export default function CreatePatientModal({ open, setOpen }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    gender: "",
  });

  const create = useCallback(() => {
    dispatch(createPatient(formData));
  }, [dispatch, formData]);

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
      className="invoice-form gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        create();
        setOpen(false);
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="title">First Name</label>
              <Input
                type="text"
                id="title"
                className="border border-gray-300 rounded-lg"
                value={formData.firstName}
                setValue={(value) => {
                  setFormData((prev) => ({
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
                value={formData.lastName}
                setValue={(value) => {
                  setFormData((prev) => ({
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
                value={formData.email}
                setValue={(value) => {
                  setFormData((prev) => ({
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
                value={formData.phone}
                setValue={(value) => {
                  setFormData((prev) => ({
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
                  {age(formData) === "" ? null : (
                    <h6>
                      <span>Age:</span> {age(formData)}
                    </h6>
                  )}
                </div>
                <p>
                  <Input
                    type="date"
                    value={
                      formData?.dob?.toString().slice(0, 10) ||
                      new Date().toISOString().slice(0, 10)
                    }
                    placeholder=""
                    setValue={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        dob: value,
                      }));
                    }}
                  />
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1 space-x-19 w-full">
              <h4>Gender</h4>
              <div className={styles.gender}>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) => {
                      setFormData((prev) => ({
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
                    checked={formData.gender === "female"}
                    onChange={(e) => {
                      setFormData((prev) => ({
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
              value={formData?.city}
              placeholder=""
              setValue={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  city: value,
                }));
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800 w-full"
        >
          Create
        </button>
      </div>
    </form>
  );
}
