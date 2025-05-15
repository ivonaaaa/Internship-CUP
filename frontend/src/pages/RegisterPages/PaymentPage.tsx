import React from "react";
import { useNavigate } from "react-router-dom";
import GooglePayIcon from "../../assets/images/Goggle Pay.svg";
import ApplePayIcon from "../../assets/images/Apple Pay.svg";
import ArrowLeft from "../../assets/images/ArrowLeft.svg";
import c from "./PaymentPage.module.css";
import "../../styles/App.css";

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => navigate("/register-card");
  return (
    <div className={c.container}>
      <img
        src={ArrowLeft}
        alt="arrow"
        className="arrow"
        onClick={() => navigate(-1)}
      />
      <h1 className="registerHeadline">Choose payment method</h1>
      <div className={c.buttonGroup}>
        <button className={c.button} onClick={handleRedirect}>
          Pay with Credit/Debit card
        </button>
        <button className={c.button} onClick={handleRedirect}>
          Pay with
          <img src={GooglePayIcon} alt="Google Pay logo" />
        </button>
        <button className={c.button} onClick={handleRedirect}>
          Pay with
          <img src={ApplePayIcon} alt="Apple Pay logo" />
        </button>
      </div>
    </div>
  );
};
