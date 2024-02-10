import classNames from "classnames";
import styles from "./styles/index.module.scss";

export default function Patient({
  patient,
  index,
  active,
  setActive,
  setActivePatient,
}) {
  return (
    <div
      key={index}
      className={classNames({
        [styles.patient]: true,
        [styles.active]: index === active,
      })}
      onClick={() => {
        setActive(index);
        setActivePatient(patient);
      }}
    >
      <div>
        <h3>
          {patient?.firstName} {patient?.lastName}
        </h3>
        <p>{patient?.email}</p>
      </div>
      <div>
        <p>{patient?.age}</p>
        <p>{patient?.city}</p>
      </div>
    </div>
  );
}
