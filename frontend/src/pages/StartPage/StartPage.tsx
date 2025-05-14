import { useNavigate } from "react-router-dom";
import Dolphin from "../../assets/images/dolphin.png";
import Sea from "../../assets/images/sea.png";
import c from "./StartPage.module.css";

export const StartPage: React.FC = () => {
  const navigate = useNavigate();

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
    </div>
  );
};
