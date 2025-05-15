import { BoatForm } from "../../components/BoatForm";
import "../../styles/App.css";

export function AddBoatPage() {
  return (
    <div className="SeaContainer">
      <BoatForm context="profile" />
    </div>
  );
}
