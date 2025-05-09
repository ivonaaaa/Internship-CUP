import { AuthForm } from "../../components/AuthForm";
import "../../App.css";

export function RegisterPage() {
  return (
    <div className="page-container">
      <AuthForm mode="register" />
    </div>
  );
}
