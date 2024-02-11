import Breadcrumb from "./components/header";
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
  const [activePatient, setActivePatient] = useState({});

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
    dispatch(getPatientById(patientId));
    dispatch(getMedicalRecordsByPatientId(patientId));
    dispatch(getPrescriptionsByPatientId(patientId));
  }, [dispatch, patientId]);

  return (
    <div className={styles.container}>
      <Breadcrumb items={breadcrumbItems} />
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
              onClick={() => {
                setPrescriptionModal(true);
              }}
            >
              Insert Prescription
            </button>
            <button
              onClick={() => {
                setRecordModal(true);
              }}
            >
              Insert Medical Record
            </button>
            <button
              onClick={() => {
                setInvoiceModal(true);
              }}
            >
              Create Invoice
            </button>
          </div>
          <div className={styles.infoContainer}>
            {Array.isArray(prescriptions) && prescriptions.length > 0 && (
              <Prescriptions data={prescriptions || []} />
            )}
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
