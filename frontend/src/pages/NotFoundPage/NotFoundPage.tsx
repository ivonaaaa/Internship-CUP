import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import logoBackground from "../../assets/images/big-logo-background.svg";
import c from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={c.notFoundPage}>
      <h2>404</h2>
      <p>Page not found</p>
      <div onClick={() => navigate(ROUTES.HOME)} className={c.homepageButton}>
        Homepage
      </div>
      <img src={logoBackground} className={c.logoBackground} />
    </div>
  );
};
