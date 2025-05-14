import { BoatForm } from "../../components/BoatForm";
import "../../styles/App.css";

export function RegisterBoatPage() {
  return (
    <div className="SeaContainer">
      <BoatForm context="registration" />
    </div>
  );
}
