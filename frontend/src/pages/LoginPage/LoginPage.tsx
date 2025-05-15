import { AuthForm } from "../../components/AuthForm";
import "../../styles/App.css";

export function LoginPage() {
  return (
    <div className="SeaContainer">
      <AuthForm mode="login" />
    </div>
  );
}
