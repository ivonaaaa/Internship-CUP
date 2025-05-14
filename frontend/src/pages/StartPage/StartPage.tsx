import { useNavigate } from "react-router-dom";
import Dolphin from "../../assets/images/dolphin.png";
import Sea from "../../assets/images/sea.png";
import c from "./StartPage.module.css";
import { useAuth } from "../../contexts/AuthContext";

export const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLiveDemoClick = async () => {
    await login("marko@gmail.com", "password123");
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

      <button className={c.signInBtn} onClick={() => navigate("/login")}>
        Sign in
      </button>
      <p className={c.registerText}>
        Don't have an account?{" "}
        <span onClick={() => navigate("/register")}>Register</span>
      </p>
      <p className={c.liveDemoText} onClick={handleLiveDemoClick}>
        Try live demo
      </p>
    </div>
  );
};
