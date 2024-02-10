import { useState } from "react";
import styles from "./styles/index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlusSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../../../common/Input";
import Breadcrumb from "../header";
const breadcrumbItems2 = [
  { label: "Details", url: "#" },
  { label: "Working Time", url: "#" },
];
const Patients = ({ activePatient, setActivePatient }) => {
  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <Breadcrumb items={breadcrumbItems2} />
        {addActive || editActive ? (
          <div className={styles.actions}>
            <div
              className={styles.saveBtn}
              onClick={() => {
                console.log("save");
                setAddActive(false);
                setEditActive(false);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <p>Save</p>
            </div>
            <div
              className={styles.cancelBtn}
              onClick={() => {
                console.log("save");
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
                console.log("add");
                setAddActive(true);
                setActivePatient({});
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
        <div
          className={styles.detailsContent}
        >
          <div
            className={styles.row}
          >
            <h4>First Name</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={activePatient?.firstName}
                  placeholder=""
                  setValue={(value) => {
                    setActivePatient((prev) => ({
                      ...prev,
                      firstName: value,
                    }));
                  }}
                />
              ) : (
                activePatient?.firstName
              )}
            </p>
          </div>
          <div
            className={styles.row}
          >
            <h4>Last Name</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={activePatient?.lastName}
                  placeholder=""
                  setValue={(value) => {
                    setActivePatient((prev) => ({
                      ...prev,
                      lastName: value,
                    }));
                  }}
                />
              ) : (
                activePatient?.lastName
              )}
            </p>
          </div>
          <div
            className={styles.row}
          >
            <h4>Email</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="email"
                  value={activePatient?.email}
                  placeholder=""
                  setValue={(value) => {
                    setActivePatient((prev) => ({
                      ...prev,
                      email: value,
                    }));
                  }}
                />
              ) : (
                activePatient?.email
              )}
            </p>
          </div>
          <div
            className={styles.row}
          >
            <h4>Phone Number</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={activePatient?.phoneNumer}
                  placeholder=""
                  setValue={(value) => {
                    setActivePatient((prev) => ({
                      ...prev,
                      phoneNumer: value,
                    }));
                  }}
                />
              ) : (
                activePatient?.phoneNumer
              )}
            </p>
          </div>
          <div
            className={styles.row}
          >
            <h4>Date of Birth</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="date"
                  value={
                    editActive ? activePatient?.dob?.toString().slice(0, 10) : ""
                  }
                  placeholder=""
                  setValue={(value) => {
                    setActivePatient((prev) => ({
                      ...prev,
                      dob: value,
                    }));
                  }}
                />
              ) : (
                activePatient?.dob?.toString().slice(0, 10)
              )}
            </p>
          </div>
          <div
            className={styles.row}
          >
            <h4>City</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={activePatient?.city}
                  placeholder=""
                  setValue={(value) => {
                    setActivePatient((prev) => ({
                      ...prev,
                      city: value,
                    }));
                  }}
                />
              ) : (
                activePatient?.city
              )}
            </p>
          </div>
          <div
            className={styles.row}
          >
            <h4>Notes</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={editActive ? activePatient?.notes : ""}
                  placeholder=""
                  setValue={(value) => {
                    setActivePatient((prev) => ({
                      ...prev,
                      notes: value,
                    }));
                  }}
                />
              ) : (
                activePatient?.notes
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Patients;
