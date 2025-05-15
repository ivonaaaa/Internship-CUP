import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateCardDetails } from "../../utils/CardFormValidation";
import MasterCardIcon from "../../assets/images/Mastercard.svg";
import c from "./CardPage.module.css";

export const CardPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCancel = () => navigate(-1);
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
    <div className={c.container}>
      <h1 className={c.title}>Enter card details</h1>
      <div className={c.column}>
        <label className={c.label}>Name and Surname</label>
        <input
          className={c.input}
          type="text"
          placeholder="Enter your Name and Surname"
          value={name}
          onChange={handleNameChange}
        />
        {errors.name && (
          <div className="errorList">
            <span className={c.errorMessage}>{errors.name}</span>
          </div>
        )}
      </div>
      <div className={c.column}>
        <label className={c.label}>Card number</label>
        <div className={c.cardInputWrapper}>
          <div className={c.cardIconWrapper}>
            <img src={MasterCardIcon} alt="Card logo" className={c.cardIcon} />
          </div>
          <input
            className={c.cardInput}
            type="text"
            placeholder="Enter your card number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={16}
          />
        </div>
        {errors.cardNumber && (
          <div className={c.errorMessage}>{errors.cardNumber}</div>
        )}
      </div>
      <div className={c.row}>
        <div className={c.column}>
          <label className={c.label}>Expiration date</label>
          <input
            className={c.input}
            type="text"
            placeholder="MM/YY"
            value={expiration}
            onChange={handleExpirationChange}
            maxLength={5}
          />
          {errors.expiration && (
            <div className={c.errorMessage}>{errors.expiration}</div>
          )}
        </div>
        <div className={c.column}>
          <label className={c.label}>CVV</label>
          <input
            className={c.input}
            type="text"
            placeholder="XXX"
            value={cvv}
            onChange={handleCvvChange}
            maxLength={3}
          />
          {errors.cvv && <div className={c.errorMessage}>{errors.cvv}</div>}
        </div>
      </div>

      <div className={c.buttonGroup}>
        <button className={c.cancelBtn} onClick={handleCancel}>
          Cancel
        </button>
        <button className={c.payBtn} onClick={handlePay}>
          Pay now
        </button>
      </div>
    </div>
  );
};
