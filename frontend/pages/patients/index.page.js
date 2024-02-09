import { useState } from "react";
import Sidenav from "./components/Sidenav";
import styles from "./styles/index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlusSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../common/Input";
import Breadcrumb from "../users/header";
const breadcrumbItems2 = [
  { label: 'Details', url: '#' },
  { label: 'Working Time', url: '#' },
];
const Patients = () => {
  const [activePatient, setActivePatient] = useState({});
  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);

  console.log("activePatient", activePatient);

  const patients = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      age: "25",
      phoneNumer: "1234567890",
      city: "New York",
      notes: "Some notes",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@gmail.com",
      age: "25",
      phoneNumer: "1234567890",
      city: "New York",
      notes: "Some notes",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      age: "25",
      phoneNumer: "1234567890",
      city: "New York",
      notes: "Some notes",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@gmail.com",
      age: "25",
      phoneNumer: "1234567890",
      city: "New York",
      notes: "Some notes",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      age: "25",
      phoneNumer: "1234567890",
      city: "New York",
      notes: "Some notes",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@gmail.com",
      age: "25",
      phoneNumer: "1234567890",
      city: "New York",
      notes: "Some notes",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      age: "25",
      phoneNumer: "1234567890",
      city: "New York",
      notes: "Some notes",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@gmail.com",
      age: "25",
      phoneNumer: "1234567890",
      city: "New York",
      notes: "Some notes",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      age: "25",
      phoneNumer: "1234567890",
      city: "New York",
      notes: "Some notes",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@gmail.com",
      age: "25",
      phoneNumer: "1234567890",
      city: "New York",
      notes: "Some notes",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      age: "25",
      phoneNumer: "1234567890",
      city: "New York",
      notes: "Some notes",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@gmail.com",
      age: "25",
      phoneNumer: "1234567890",
      city: "New York",
      notes: "Some notes",
    },
  ];
  return (
    <div className={styles.container}>
      <div>
        <Sidenav
          patients={patients}
          activePatient={activePatient}
          setActivePatient={setActivePatient}
        />
      </div>
      <div className={styles.details}>
        <div className={styles.actions}>
          <div
            className={styles.btn}
            onClick={() => {
              console.log("add");
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
         <div className="ml-5"> <Breadcrumb items={breadcrumbItems2} />
         </div>
        </div>
        <h3>Details</h3>
        <div>
          <div>
            <h4>First Name</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={activePatient?.firstName}
                  placeholder=""
                />
              ) : (
                activePatient?.firstName
              )}
            </p>
          </div>
          <div>
            <h4>Last Name</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={activePatient?.lastName}
                  placeholder=""
                />
              ) : (
                activePatient?.lastName
              )}
            </p>
          </div>
          <div>
            <h4>Email</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="email"
                  value={activePatient?.email}
                  placeholder=""
                />
              ) : (
                activePatient?.email
              )}
            </p>
          </div>
          <div>
            <h4>Phone Number</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={activePatient?.phoneNumer}
                  placeholder=""
                />
              ) : (
                activePatient?.phoneNumer
              )}
            </p>
          </div>
          <div>
            <h4>Age</h4>
            <p>
              {addActive || editActive ? (
                <Input type="text" value={activePatient?.age} placeholder="" />
              ) : (
                activePatient?.age
              )}
            </p>
          </div>
          <div>
            <h4>City</h4>
            <p>
              {addActive || editActive ? (
                <Input type="text" value={activePatient?.city} placeholder="" />
              ) : (
                activePatient?.city
              )}
            </p>
          </div>
          <div>
            <h4>Notes</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={
                    editActive ?
                      activePatient?.notes :
                      ""
                  }
                  placeholder=""
                  setValue={(value) => {
                    setActivePatient((prev) => ({
                      ...prev,
                      notes: value,
                    }));
                  }
                  }
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
