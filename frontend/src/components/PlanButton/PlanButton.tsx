import React from "react";
import { PlanOption } from "../../pages/RegisterPages/SubscriptionPage";
import styles from "./PlanButton.module.css";

interface PlanButtonProps {
  plan: PlanOption;
  isSelected: boolean;
  onSelect: (planId: string) => void;
}

export const PlanButton: React.FC<PlanButtonProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  const handleClick = () => {
    onSelect(plan.id);
  };

  return (
    <button
      className={`${styles.planButton} ${isSelected ? styles.selected : ""}`}
      onClick={handleClick}
      aria-pressed={isSelected}
    >
      <div className={styles.period}>{plan.period}</div>

      <div className={styles.checkCircle}>
        <svg viewBox="0 0 24 24" width="24" height="24">
          <circle
            cx="12"
            cy="12"
            r="10"
            fill={isSelected ? "#000000" : "#e0e0e0"}
          />
          {isSelected && (
            <path
              d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
              fill="white"
              transform="scale(0.6)"
              style={{ transformOrigin: "center" }}
            />
          )}
        </svg>
      </div>

      <div className={styles.priceLabel}>price EUR</div>
      <div className={styles.priceValue}>{plan.price.toFixed(2)}</div>
    </button>
  );
};
