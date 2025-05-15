import { useParams } from "react-router-dom";
import { BoatForm } from "../../components/BoatForm";
import "../../styles/App.css";
import c from "./BoatPage.module.css";
import { NavBar } from "../../components/NavBar";
import boatAvatar from "../../assets/images/boat-avatar.svg";
import leftArrow from "../../assets/images/whiteArrowLeft.svg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";

export function BoatPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const context = isEditMode ? "registration" : "profile";
  const mode = "edit";

  return (
    <div className={c.boatPage}>
      <img
        src={leftArrow}
        alt="Back Arrow"
        className="arrow"
        onClick={() => navigate(ROUTES.PROFILE)}
      />
      <div className={c.blueTopBackground}></div>
      <div className={c.boatProfilePicture}>
        <img src={boatAvatar} alt="Avatar Background" />
      </div>
      <div className={c.formWrapper}>
        <BoatForm
          context={context}
          mode={mode}
          boatId={isEditMode ? parseInt(id) : undefined}
          showTitle={false}
        />
      </div>
      <NavBar />
    </div>
  );
}
