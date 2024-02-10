import styles from "./styles/index.module.scss";
export default function Medicalrecords({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <h1>Medical Records</h1>
        {data.map((record, index) => (
          <div
            className={styles.record}
            key={index}
            onClick={() => {
              console.log("record clicked");
            }}
          >
            <div>
              <h1>{record?.title}</h1>
              <h3>{record?.date.toString().slice(0, 10)}</h3>
            </div>
            <p className={styles.notes}>{record?.notes}</p>
          </div>
        ))}
        <div className={styles.btn}>
          <button href="#">View all</button>
        </div>
      </div>
    </div>
  );
}
