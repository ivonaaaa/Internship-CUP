import { useParams } from "react-router-dom";
import { BoatForm } from "../../components/BoatForm";
import "../../styles/App.css";

export function EditBoatPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Error: No boat ID provided</div>;
  }

  return (
    <div className="SeaContainer">
      <BoatForm context="profile" mode="edit" boatId={parseInt(id)} />
    </div>
  );
}
