import React from "react";
import { useNavigate } from "react-router-dom";
//import styles from "./CardPage.module.css";

export const CardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Choose payment method</h1>
      <div>
        <button onClick={handleRedirect}>zzzzzzzzzzzzzzzz</button>
      </div>
    </div>
  );
};
