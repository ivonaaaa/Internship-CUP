import { AuthForm } from "../../components/AuthForm/AuthForm";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  return (
    <div className={styles["pageContainer"]}>
      <AuthForm mode="login" />
    </div>
  );
}
