import { AuthForm } from "../../components/AuthForm";
import "../../styles/App.css";

export function RegisterUserPage() {
  return (
    <div className="SeaContainer">
      <AuthForm mode="register" />
    </div>
  );
}
