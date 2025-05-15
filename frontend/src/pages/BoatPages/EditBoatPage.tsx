import { useParams } from "react-router-dom";
import { BoatForm } from "../../components/BoatForm";
import "../../styles/App.css";
import c from "./EditBoatPage.module.css";
import { NavBar } from "../../components/NavBar";
import boatAvatar from "../../assets/images/boat-avatar.svg";

export function EditBoatPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Error: No boat ID provided</div>;
  }

  return (
    <div className={c.editBoatPage}>
      <div className={c.blueTopBackground}></div>
      <div className={c.boatProfilePicture}>
        <img src={boatAvatar} alt="Avatar Background" />
      </div>
      <div className={c.formWrapper}>
        <BoatForm
          context="registration"
          mode="edit"
          boatId={parseInt(id)}
          showTitle={false}
        />
      </div>
      <NavBar />
    </div>
  );
}
