import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export default function Input({
  type = "text",
  placeholder = "Enter text",
  value = "",
  theme = "outlined",
  search = false,
  setValue,
}) {
  return (
    <div className={styles.container}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={classNames({
          [styles.input]: true,
          [styles.outlined]: theme === "outlined",
          [styles.underlined]: theme === "underlined",
          [styles.search]: search,
        })}
      />
      {search && (
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      )}
    </div>
  );
}
