import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CardPage.module.css";
import MasterCardIcon from "../../assets/images/Mastercard.svg";
import { validateCardDetails } from "../../utils/CardFormValidation";

export const CardPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCancel = () => {
    navigate(-1);
  };

  const handlePay = () => {
    const validationErrors = validateCardDetails(
      name,
      cardNumber,
      expiration,
      cvv
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    navigate("/");
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCardNumber(value);
    if (errors.cardNumber) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.cardNumber;
        return newErrors;
      });
    }
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2, 4);

    setExpiration(value);

    if (errors.expiration) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.expiration;
        return newErrors;
      });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.name;
        return newErrors;
      });
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(value);
    if (errors.cvv) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.cvv;
        return newErrors;
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter card details</h1>

      <label className={styles.label}>Name and Surname</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter your Name and Surname"
        value={name}
        onChange={handleNameChange}
      />
      {errors.name && <div className={styles.errorMessage}>{errors.name}</div>}

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
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxLength={16}
        />
      </div>
      {errors.cardNumber && (
        <div className={styles.errorMessage}>{errors.cardNumber}</div>
      )}

      <div className={styles.row}>
        <div className={styles.column}>
          <label className={styles.labelRow}>Expiration date</label>
          <input
            className={styles.input}
            type="text"
            placeholder="MM/YY"
            value={expiration}
            onChange={handleExpirationChange}
            maxLength={5}
          />
          {errors.expiration && (
            <div className={styles.errorMessage}>{errors.expiration}</div>
          )}
        </div>
        <div className={styles.column}>
          <label className={styles.labelRow}>CVV</label>
          <input
            className={styles.input}
            type="text"
            placeholder="XXX"
            value={cvv}
            onChange={handleCvvChange}
            maxLength={3}
          />
          {errors.cvv && (
            <div className={styles.errorMessage}>{errors.cvv}</div>
          )}
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
