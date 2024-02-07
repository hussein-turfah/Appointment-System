import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";

export default function Tab({ text, icon, active, setActive }) {
  const router = useRouter();

  return (
    <div
      className={classNames({
        [styles.tab]: true,
        [styles.active]: active,
      })}
      onClick={() => {
        setActive(text.toLowerCase());
        router.push(`/${text.toLowerCase()}`);
      }}
    >
      <FontAwesomeIcon icon={icon} />
      <span>{text}</span>
    </div>
  );
}
