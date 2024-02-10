import styles from "./styles/index.module.scss";
export default function Medicalrecords({ activePatient, setActivePatient }) {
  return (
    <div className={styles.container}>
      <h1>Medicalrecords</h1>
      {/* <div className={styles.details}>
        {console.log(activePatient)}
      </div> */}
    </div>
  );
}
