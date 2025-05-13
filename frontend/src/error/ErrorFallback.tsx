import React from "react";
import { ErrorFallbackProps } from "../types/errors";
import c from "./ErrorFallback.module.css";
import logoBackground from "../assets/images/big-logo-background.svg";

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  resetErrorBoundary,
}) => {
  return (
    <div className={c.errorFallback}>
      <h2>Uh oh, something went wrong!</h2>
      <p>We apologize for the inconvenience.</p>
      {resetErrorBoundary && (
        <div onClick={resetErrorBoundary} className={c.resetButton}>
          Try again
        </div>
      )}
      <img src={logoBackground} className={c.logoBackground} />
    </div>
  );
};
