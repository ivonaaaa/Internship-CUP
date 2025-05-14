import { BoatForm } from "../../components/BoatForm";
import "../../styles/App.css";

export function AddBoatPage() {
  return (
    <div className="pageContainer">
      <BoatForm context="profile" />
    </div>
  );
}
