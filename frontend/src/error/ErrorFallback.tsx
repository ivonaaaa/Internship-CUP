import React from "react";
import { ErrorFallbackProps } from "../types/errors";
import styles from "./ErrorFallback.module.css";

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  resetErrorBoundary,
}) => {
  return (
    <div className={styles["errorFallback"]}>
      <h2>Uh oh, something went wrong!</h2>
      <p>We apologize for the inconvenience.</p>
      {resetErrorBoundary && (
        <button onClick={resetErrorBoundary}>Try again</button>
      )}
    </div>
  );
};
