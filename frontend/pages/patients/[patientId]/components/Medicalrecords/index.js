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
        
<div  className="flex justify-between">
  <div>
  <button className="mr-2 border border-black text-black font-bold py-1 px-2 rounded">Prescriptions</button>
  <button className="border border-black  text-black font-bold py-1 px-2 rounded">Attach</button></div>
  <div>
  <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" id="attachCheckbox" />
</div>
</div>
<div className="flex">
  <div className="mr-4">
    <h2>20</h2>
    <h3>{record?.date.toString().slice(0, 10)}</h3>
  </div>
  <p className="flex-1">
    Indicates well-controlled chronic conditions and regular follow-up with his healthcare provider for ongoing management and monitoring
  </p>
</div>
<hr/>
<div className="flex justify-between">
  <button className="border border-black text-black font-bold py-1 px-2 rounded">Fees</button>
  <button className="border border-black text-black font-bold py-1 px-2 rounded">Create Invoice</button>
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
