import styles from "./styles/index.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Sidenav from "./components/Sidenav";
import Modal from "../../common/Modal";
import { getServices } from "../../actions/ServiceActions";
import Services from "./components/details";

export default function ServicesInfo() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeService, setActiveService] = useState({});

  const services = useSelector(({ ServiceData }) => ServiceData.allServices.data);

  const medicalRecords = useSelector(({ MedicalRecordData }) =>
    MedicalRecordData?.patientMedicalRecords.slice(0, 5)
  );

  const prescriptions = useSelector(({ PrescriptionData }) =>
    PrescriptionData?.patientPrescriptions.slice(0, 5)
  );

  useEffect(() => {
    dispatch(getServices());
  }
  , [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        <Sidenav
        services={services}
        activeService={activeService}
        setActiveService={setActiveService}
        />
        <Services />
        {/* <div className={styles.bodyContainer}>
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
        </div> */}
      </div>
    </div>
  );
}
