import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Dolphin from "../../assets/images/dolphin.webp";
import Sea from "../../assets/images/sea.webp";
import c from "./StartPage.module.css";
import { ROUTES } from "../../constants";

export const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLiveDemoClick = async () => {
    await login("john.doe@gmail.com", "securepass456");
    navigate("/");
  };

  return (
    <div className={c.container}>
      <img src={Dolphin} alt="dolphin" className={c.dolphin} />
      <img src={Sea} alt="sea overlay" className={c.sea} />

      <h1 className={c.title}>
        Time to <br />
        sail safe
      </h1>

      <button className={c.signInBtn} onClick={() => navigate(ROUTES.LOGIN)}>
        Sign in
      </button>
      <p className={c.registerText}>
        Don't have an account?{" "}
        <span onClick={() => navigate(ROUTES.REGISTER)}>Register</span>
      </p>
      <p className={c.liveDemoText} onClick={handleLiveDemoClick}>
        Try live demo
      </p>
    </div>
  );
};
