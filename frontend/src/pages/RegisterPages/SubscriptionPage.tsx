import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlanButton } from "../../components/PlanButton";
import ArrowLeft from "../../assets/images/ArrowLeft.svg";
import c from "./SubscriptionPage.module.css";
import "../../styles/App.css";

export interface PlanOption {
  id: string;
  period: string;
  price: number;
}

export const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const planOptions: PlanOption[] = [
    { id: "weekly", period: "7 days", price: 24.99 },
    { id: "yearly", period: "12 months", price: 49.99 },
  ];

  const handlePlanSelect = (planId: string) => setSelectedPlan(planId);
  const handleNext = () => {
    if (selectedPlan) navigate("/register-payment");
  };

  return (
    <div className={c.container}>
      <img
        src={ArrowLeft}
        alt="arrow"
        className="arrow"
        onClick={() => navigate(-1)}
      />
      <h1 className="registerHeadline">Choose your plan</h1>
      <p className={c.trialText}>3 day free trial!</p>

      <div className={c.plansContainer}>
        {planOptions.map((plan) => (
          <PlanButton
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan === plan.id}
            onSelect={handlePlanSelect}
          />
        ))}
      </div>

      <button
        className={c.nextButton}
        onClick={handleNext}
        disabled={!selectedPlan}
      >
        Next
      </button>
    </div>
  );
};
