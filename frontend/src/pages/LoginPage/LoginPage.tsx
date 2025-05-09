import { AuthForm } from "../../components/AuthForm";
import "../../App.css";

export function LoginPage() {
  return (
    <div className="page-container">
      <AuthForm mode="login" />
    </div>
  );
}
