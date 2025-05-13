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
      <div className={styles.topRow}>
        <div className={styles.period}>{plan.period}</div>
        <div className={styles.checkCircle}>
          <div
            className={`${styles.circle} ${isSelected ? styles.circleSelected : ""}`}
          >
            <svg
              className={styles.checkIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 16.2l-4.2-4.2-1.4 1.4L9 19l12-12-1.4-1.4z"
                fill={isSelected ? "white" : "#999"}
              />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.price}>{plan.price.toFixed(2)}€</div>
        <div className={styles.subPrice}>
          <div>
            {plan.id === "weekly"
              ? (plan.price / 7).toFixed(2) + "€"
              : (plan.price / 12).toFixed(2) + "€"}
          </div>
          <div className={styles.subPriceText}>
            {plan.id === "weekly" ? "per day" : "per month"}
          </div>
        </div>
      </div>
    </button>
  );
};
