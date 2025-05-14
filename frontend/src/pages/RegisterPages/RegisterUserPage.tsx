import { AuthForm } from "../../components/AuthForm";
import "../../App.css";
import c from "./RegisterUserPage.module.css";
import whiteArrowLeft from "../../assets/images/whiteArrowLeft.svg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";

export function RegisterUserPage() {
  const navigate = useNavigate();

  return (
    <div className={c.pageContainer}>
      <img
        src={whiteArrowLeft}
        alt="arrow"
        onClick={() => navigate(ROUTES.START)}
        className={c.arrow}
      />
      <AuthForm mode="register" />
    </div>
  );
}
