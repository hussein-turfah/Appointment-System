import { useCallback, useState } from "react";
import styles from "./styles/index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlusSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../../../common/Input";
import Breadcrumb from "../header";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatient,
  updatePatient,
} from "../../../../actions/PatientActions";
const breadcrumbItems2 = [
  { label: "Details", url: "#" },
  { label: "Working Time", url: "#" },
];
const Patients = () => {
  const dispatch = useDispatch();
  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);

  const selectedPatient = useState(
    useSelector(({ PatientData }) => PatientData?.selectedPatient.data)
  );

  const [newPatientData, setNewPatientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumer: "",
    dob: "",
    city: "",
    notes: "",
  });

  const edit = (id) => {
    dispatch(updatePatient(id, newPatientData));
  };

  const create = useCallback(async () => {
    await dispatch(createPatient(newPatientData));
  }, [dispatch, newPatientData]);

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
        <Breadcrumb items={breadcrumbItems2} />
        {addActive || editActive ? (
          <div className={styles.actions}>
            <div
              className={styles.saveBtn}
              onClick={() => {
                // setAddActive(false);
                // setEditActive(false);
                addActive
                  ? create()
                  : editActive
                  ? edit(selectedPatient.id)
                  : null;
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
                console.log("edit");
                setEditActive(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <p>Edit</p>
            </div>
            <div
              className={styles.btn}
              onClick={() => {
                console.log("delete");
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
                  value={
                    newPatientData.phoneNumer || selectedPatient?.phoneNumer
                  }
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      phoneNumer: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.phoneNumer
              )}
            </p>
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
                    newPatientData.dob.toString().slice(0, 10) ||
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
