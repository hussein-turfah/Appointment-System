import Breadcrumb from "./components/header";
import Patients from "./components/details";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatients } from "../../actions/PatientActions";
import Sidenav from "./components/Sidenav";
import styles from "./styles/index.module.scss";
import Medicalrecords from "./components/Mdeicalrecords";
export default function Users() {
  const dispatch = useDispatch();

  const [activePatient, setActivePatient] = useState({});

  const allPatients = useSelector(
    ({ PatientData }) => PatientData.allPatients.data
  );

  const breadcrumbItems = [
    { label: "Doctors", url: "#" },
    { label: "Secretaries", url: "#" },
    { label: "Admins" },
  ];

  useEffect(() => {
    dispatch(getAllPatients());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Breadcrumb items={breadcrumbItems} />
      <div>
        <Sidenav
          patients={allPatients.data}
          activePatient={activePatient}
          setActivePatient={setActivePatient}
        />
        <Patients
          activePatient={activePatient}
          setActivePatient={setActivePatient}
        />
        <Medicalrecords
          activePatient={activePatient}
          setActivePatient={setActivePatient}
        />
      </div>
    </div>
  );
}
