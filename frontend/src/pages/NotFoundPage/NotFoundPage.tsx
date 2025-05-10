import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.notFoundPage}>
      <h2>404</h2>
      <p>Page not found</p>
      <button onClick={handleClick}>Homepage</button>
    </div>
  );
};
