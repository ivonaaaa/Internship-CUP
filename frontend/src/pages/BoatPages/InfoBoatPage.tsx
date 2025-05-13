import { useParams } from "react-router-dom";
import { BoatForm } from "../../components/BoatForm";
import "../../App.css";

export function InfoBoatPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>Error: No boat ID provided</div>;

  return (
    <div className="page-container">
      <BoatForm context="profile" mode="info" boatId={parseInt(id)} />
    </div>
  );
}
