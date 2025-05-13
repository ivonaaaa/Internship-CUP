import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CardPage.module.css";
import MasterCardIcon from "../../assets/images/Mastercard.svg";

export const CardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handlePay = () => {
    alert("Payment submitted!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter card details</h1>

      <label className={styles.label}>Name and Surname</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter your Name and Surname"
      />

      <label className={styles.label}>Card number</label>
      <div className={styles.cardInputWrapper}>
        <div className={styles.cardIconWrapper}>
          <img
            src={MasterCardIcon}
            alt="Card logo"
            className={styles.cardIcon}
          />
        </div>
        <input
          className={styles.cardInput}
          type="text"
          placeholder="Enter your card number"
        />
      </div>

      <div className={styles.row}>
        <div className={styles.column}>
          <label className={styles.labelRow}>Expiration date</label>
          <input className={styles.input} type="text" placeholder="MM/YY" />
        </div>
        <div className={styles.column}>
          <label className={styles.labelRow}>CVV</label>
          <input className={styles.input} type="text" placeholder="XXX" />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.cancelBtn} onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.payBtn} onClick={handlePay}>
          Pay now
        </button>
      </div>
    </div>
  );
};
