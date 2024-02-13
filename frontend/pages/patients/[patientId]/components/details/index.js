import { useCallback, useState } from "react";
import styles from "./styles/index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlusSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../../../../common/Input";
import { useDispatch, useSelector } from "react-redux";
import { deletePatient, updatePatient } from "../../../../../actions/PatientActions";

const Patients = () => {
  const dispatch = useDispatch();
  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);

  const selectedPatient = useSelector(
    ({ PatientData }) => PatientData?.selectedPatient.data
  );

  const [newPatientData, setNewPatientData] = useState(
    selectedPatient || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      city: "",
      notes: "",
    }
  );

  const update = useCallback(
    (id) => {
      dispatch(updatePatient(id, newPatientData));
    },
    [addActive, newPatientData]
  );

  const age = (newPatientData) => {
    const dob = new Date(newPatientData.dob);
    const now = new Date();
    const ageInYears = now.getFullYear() - dob.getFullYear();
    const ageInMonths = now.getMonth() - dob.getMonth();
    const ageInDays = now.getDate() - dob.getDate();
    const ageInHours = Math.floor((now - dob) / (1000 * 60 * 60));
    const ageInWeeks = Math.floor(ageInDays / 7);

    // Condition for years
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
    <div className={styles.container}>
      <div className={styles.details}>
       
        {addActive || editActive ? (
          <div className={styles.actions}>
            <div
              className={styles.saveBtn}
              onClick={() => {
                setAddActive(false);
                setEditActive(false);
                editActive ? update(selectedPatient.id) : null;
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <p>Save</p>
            </div>
            <div
              className={styles.cancelBtn}
              onClick={() => {
                setAddActive(false);
                setEditActive(false);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              <p>Cancel</p>
            </div>
          </div>
        ) : (
          <div className={styles.actions}>
            <div
              className={styles.btn}
              onClick={() => {
                setAddActive(true);
              }}
            >
              <FontAwesomeIcon icon={faPlusSquare} />
              <p>Add</p>
            </div>
            <div
              className={styles.btn}
              onClick={() => {
                setEditActive(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <p>Edit</p>
            </div>
            <div
              className={styles.btn}
              onClick={() => {
                dispatch(deletePatient(selectedPatient.id));
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              <p>Delete</p>
            </div>
          </div>
        )}
        <h3>Details</h3>
        <div className={styles.detailsContent}>
          <div className={styles.row}>
            <h4>First Name</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={newPatientData.firstName || selectedPatient?.firstName}
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      firstName: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.firstName
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Last Name</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={newPatientData.lastName || selectedPatient?.lastName}
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      lastName: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.lastName
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Email</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="email"
                  value={newPatientData.email || selectedPatient?.email}
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      email: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.email
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Phone Number</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={newPatientData.phone || selectedPatient?.phone}
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      phone: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.phone
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Gender</h4>
            <div>
              {addActive || editActive ? (
                <div className={styles.gender}>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={
                        selectedPatient.gender === "male" ||
                        newPatientData.gender === "male"
                      }
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
                      checked={
                        selectedPatient.gender === "female" ||
                        newPatientData.gender === "female"
                      }
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
              ) : (
                <div className={styles.gender}>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={selectedPatient.gender === "male"}
                      onChange={(e) => {
                        setNewPatientData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }));
                      }}
                      disabled
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      checked={selectedPatient.gender === "female"}
                      onChange={(e) => {
                        setNewPatientData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }));
                      }}
                      disabled
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
              )}
            </div>
          </div>
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
              {addActive || editActive ? (
                <Input
                  type="date"
                  value={
                    newPatientData?.dob?.toString().slice(0, 10) ||
                    selectedPatient?.dob?.toString().slice(0, 10)
                  }
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      dob: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.dob?.toString().slice(0, 10)
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>City</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={newPatientData.city || selectedPatient?.city}
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      city: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.city
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Notes</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={newPatientData.notes || selectedPatient?.notes}
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      notes: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.notes
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Patients;
