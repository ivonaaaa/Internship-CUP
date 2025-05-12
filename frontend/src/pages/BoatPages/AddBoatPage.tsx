import { BoatForm } from "../../components/BoatForm";
import "../../App.css";

export function AddBoatPage() {
  return (
    <div className="page-container">
      <BoatForm context="profile" />
    </div>
  );
}
