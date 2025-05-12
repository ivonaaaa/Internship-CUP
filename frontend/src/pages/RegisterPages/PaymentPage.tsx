import React from "react";
import { useNavigate } from "react-router-dom";
import GooglePayIcon from "../../assets/images/Goggle Pay.svg";
import ApplePayIcon from "../../assets/images/Apple Pay.svg";
import styles from "./PaymentPage.module.css";

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/register-card");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose payment method</h1>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={handleRedirect}>
          Pay with Credit/Debit card
        </button>
        <button className={styles.button} onClick={handleRedirect}>
          Pay with
          <img src={GooglePayIcon} alt="Google Pay logo" />
        </button>
        <button className={styles.button} onClick={handleRedirect}>
          Pay with
          <img src={ApplePayIcon} alt="Apple Pay logo" />
        </button>
      </div>
    </div>
  );
};
