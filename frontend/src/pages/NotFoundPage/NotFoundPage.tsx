import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import logoBackground from "../../assets/big-logo-background.svg";
import { ROUTES } from "../../constants";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.notFoundPage}>
      <h2>404</h2>
      <p>Page not found</p>
      <div
        onClick={() => navigate(ROUTES.HOME)}
        className={styles.homepageButton}
      >
        Homepage
      </div>
      <img src={logoBackground} className={styles.logoBackground} />
    </div>
  );
};
