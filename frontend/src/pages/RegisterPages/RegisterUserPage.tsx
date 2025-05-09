import { AuthForm } from "../../components/AuthForm";
import "../../App.css";

export function RegisterUserPage() {
  return (
    <div className="page-container">
      <AuthForm mode="register" />
    </div>
  );
}
