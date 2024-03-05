import React from "react";
import { useReactToPrint } from "react-to-print";
import styles from "./styles/index.module.scss";

const MedicalRecordsPrintComponent = React.forwardRef(
  ({ medicalRecords }, ref) => (
    <div ref={ref}>
      {Array.isArray(medicalRecords) &&
        medicalRecords.map((record, index) => (
          <div key={index} className={styles.Container}>
            <p>{record?.title}</p>
            <p>{record?.description}</p>
          </div>
        ))}
    </div>
  )
);

export default MedicalRecordsPrintComponent;
