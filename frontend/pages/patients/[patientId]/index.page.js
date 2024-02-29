import Patients from "./components/details";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPatients,
  getPatientById,
} from "../../../actions/PatientActions";
import styles from "./styles/index.module.scss";
import Medicalrecords from "./components/Medicalrecords";
import { getMedicalRecordsByPatientId } from "../../../actions/MedicalRecordActions";
import { getPrescriptionsByPatientId } from "../../../actions/PrescriptionActions";
import Prescriptions from "./components/Prescriptions";
import Modal from "../../../common/Modal";
import InvoiceForm from "../../../common/EditInvoiceModal";
import CreateRecordModal from "../../../common/CreateRecordModal";
import CreatePrescriptionModal from "../../../common/CreatPrescriptionModal";
import { useRouter } from "next/router";
export default function PatientInfo() {
  const dispatch = useDispatch();
  const router = useRouter();
  const patientId = router.query.patientId;

  const [invoiceModal, setInvoiceModal] = useState(false);
  const [recordModal, setRecordModal] = useState(false);
  const [prescriptionModal, setPrescriptionModal] = useState(false);

  const selectedPatient = useSelector(
    ({ PatientData }) => PatientData?.selectedPatient.data
  );

  const medicalRecords = useSelector(({ MedicalRecordData }) =>
    MedicalRecordData?.patientMedicalRecords.slice(0, 5)
  );

  const prescriptions = useSelector(({ PrescriptionData }) =>
    PrescriptionData?.patientPrescriptions.slice(0, 5)
  );



  useEffect(() => {
    if (patientId !== "new") {
      dispatch(getPatientById(patientId));
      dispatch(getMedicalRecordsByPatientId(patientId));
      dispatch(getPrescriptionsByPatientId(patientId));
    } 
  }, [dispatch, patientId]);

  return (
    <div className={styles.container}>
      <div>
        {/* <Sidenav
          patients={allPatients.data}
          activePatient={activePatient}
          setActivePatient={setActivePatient}
        /> */}
        <Patients />
        <div className={styles.bodyContainer}>
          <div className={styles.btns}>
          <button
            onClick={() =>
              router.push(`/patients/${router.query.patientId}/printmed`)
            }
            className="p-4 ml-5 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-lg mb-10 
            text-nowrap

            "
          >
            Print Medial Record
          </button>
          <button
            onClick={() =>
              router.push(`/patients/${router.query.patientId}/printpre`)
            }
            className="p-4 ml-5 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-lg mb-10 text-nowrap
            "
          >
            Print Prescription
          </button>{" "}
          <button onClick={() =>""} className="p-4 ml-5 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-lg mb-10 text-nowrap">
            create MR
          </button>{" "}
          <button onClick={() =>""} className="p-4 ml-5 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-lg mb-10 text-nowrap">
            Print 
          </button>{" "}

          </div>
          <div className={styles.infoContainer}>
            {/* {Array.isArray(prescriptions) && prescriptions.length > 0 && (
              <Prescriptions data={prescriptions || []} />
            )} */}
            {Array.isArray(medicalRecords) && medicalRecords.length > 0 && (
              <Medicalrecords data={medicalRecords || []} />
            )}
          </div>
        </div>
      </div>
      <Modal
        active={invoiceModal}
        setActive={setInvoiceModal}
        title="Create Invoice"
        children={
          <InvoiceForm
            invoice={selectedPatient}
            setInvoiceModal={setInvoiceModal}
          />
        }
      />
      <Modal
        active={recordModal}
        setActive={setRecordModal}
        title="Create Medical Record"
        children={<CreateRecordModal />}
      />
      <Modal
        active={prescriptionModal}
        setActive={setPrescriptionModal}
        title="Create Prescription"
        children={<CreatePrescriptionModal />}
      />
    </div>
  );
}
