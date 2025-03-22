import styles from "./Loader.module.scss";
import { LoadingIcon } from "./LoaderIcon";

export const Loader = () => {
  return (
    <div className={styles.Loader}>
      <LoadingIcon />
    </div>
  );
};
