import styles from "./NoDataFound.module.scss";
import { FaSearch } from "react-icons/fa";

export const NoDataFound = ({
  message = "No data found",
}: {
  message: string;
}) => {
  return (
    <div className={styles["no-data-container"]}>
      <FaSearch className={styles["no-data-icon"]} />
      <p className={styles["no-data-text"]}>{message}</p>
    </div>
  );
};
