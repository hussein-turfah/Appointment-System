import Breadcrumb from "./components/header";
import Patients from "./components/details";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatients } from "../../actions/PatientActions";
import Sidenav from "./components/Sidenav";
import styles from "./styles/index.module.scss";
import Medicalrecords from "./components/Medicalrecords";
import { getMedicalRecordsByPatientId } from "../../actions/MedicalRecordActions";
import { getPrescriptionsByPatientId } from "../../actions/PrescriptionActions";
import Prescriptions from "./components/Prescriptions";
import Modal from "../../common/Modal";
import Dropdown from "../../common/Dropdown";
export default function Users() {
  const dispatch = useDispatch();

  const [activePatient, setActivePatient] = useState(
    // useSelector(({ PatientData }) => PatientData?.allPatients.data[0]) ||
    {}
  );

  const [modal, setModal] = useState(false);

  const allPatients = useSelector(
    ({ PatientData }) => PatientData?.allPatients.data
  );

  const selectedPatient = useSelector(
    ({ PatientData }) => PatientData?.selectedPatient.data
  );

  const medicalRecords = useSelector(({ MedicalRecordData }) =>
    MedicalRecordData?.patientMedicalRecords.slice(0, 5)
  );

  const prescriptions = useSelector(({ PrescriptionData }) =>
    PrescriptionData?.patientPrescriptions.slice(0, 5)
  );

  const breadcrumbItems = [
    { label: "Doctors", url: "#" },
    { label: "Secretaries", url: "#" },
    { label: "Admins" },
  ];

  useEffect(() => {
    dispatch(getAllPatients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMedicalRecordsByPatientId(activePatient.id));
    dispatch(getPrescriptionsByPatientId(activePatient.id));
  }, [dispatch, activePatient]);

  return (
    <div className={styles.container}>
      <Breadcrumb items={breadcrumbItems} />
      <div>
        {/* <Sidenav
          patients={allPatients.data}
          activePatient={activePatient}
          setActivePatient={setActivePatient}
        /> */}
        <Patients
          activePatient={activePatient}
          setActivePatient={setActivePatient}
        />
        <div className={styles.bodyContainer}>
          <div className={styles.btns}>
            <button>Insert Prescription</button>
            <button>Insert Medical Record</button>
            <button>Create Invoice</button>
          </div>
          <div className={styles.infoContainer}>
            <Prescriptions data={prescriptions || []} />
            {Array.isArray(medicalRecords) && medicalRecords.length > 0 && (
              <Medicalrecords data={medicalRecords || []} />
            )}
          </div>
        </div>
      </div>
      {true && (
        <Modal
          active={true}
          setActive={() => setModal(false)}
          title="Create Invoice"
          children={
            <div
              className={styles.modalContainer}
            >
              <Dropdown 
                title={"Patient"}
                
              />
              <p>Invoice</p>
              <input type="text" placeholder="Invoice" />
              <p>Amount</p>
              <input type="text" placeholder="Amount" />
              <button>Submit</button>
            </div>
          }
        />
      )}
    </div>
  );
}
