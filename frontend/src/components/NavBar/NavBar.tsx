import c from "./NavBar.module.css";
import { infoButton, homeButton, profileButton } from "../Map/buttons";
import { ROUTES } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className={c.navBar}>
      <img
        src={infoButton}
        className={c.navButton}
        onClick={() => navigate(ROUTES.INFO)}
      ></img>
      <img
        src={homeButton}
        className={c.navButton}
        onClick={() => navigate(ROUTES.HOME)}
      ></img>

      <img
        src={profileButton}
        className={c.navButton}
        onClick={() => navigate(ROUTES.PROFILE)}
      ></img>
    </div>
  );
};
