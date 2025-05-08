import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { validateAuthForm } from "../../utils/AuthFormValidation";
import styles from "./AuthForm.module.css";

type AuthFormProps = {
  mode: "login" | "register";
};

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation using the util function
    const isRegisterMode = mode === "register";
    const validationErrors = validateAuthForm(formData, isRegisterMode);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsLoading(true);

    try {
      if (isRegisterMode) {
        await register({
          username: formData.username,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        });
      } else {
        await login(formData.email, formData.password);
      }
    } catch (err: any) {
      // Don't log expected authentication errors

      // Handle 401 unauthorized errors specifically for login
      if (err?.response?.status === 401 && mode === "login") {
        setErrors([
          "Invalid email or password. Please check your credentials and try again.",
        ]);
        return;
      }

      // Get detailed error message from response if available
      const errorData = err?.response?.data;

      if (Array.isArray(errorData?.message)) {
        // If the server returns an array of error messages
        setErrors(errorData.message);
      } else if (typeof errorData?.message === "string") {
        // If the server returns a single error message string
        setErrors([errorData.message]);
      } else if (err.message) {
        // Map common error codes to user-friendly messages
        if (err.message.includes("Network Error")) {
          setErrors([
            "Unable to connect to the server. Please check your internet connection.",
          ]);
        } else if (err.message.includes("timeout")) {
          setErrors(["The request timed out. Please try again later."]);
        } else {
          setErrors([err.message]);
        }
      } else {
        // Fallback for any other error format
        setErrors(["An unknown error occurred."]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isLogin = mode === "login";
  const title = isLogin ? "Sign In" : "Sign Up";

  return (
    <form onSubmit={handleSubmit} className={styles["auth-form"]}>
      <h2>{title}</h2>

      {!isLogin && (
        <>
          <div className={styles["form-group"]}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      <div className={styles["form-group"]}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {!isLogin && (
        <>
          <div className={styles["form-group"]}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number (e.g. +12345678901)"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <small className={styles["helper-text"]}>
              Format: +[country code][number] (e.g. +12345678901)
            </small>
          </div>
        </>
      )}

      <div className={styles["form-group"]}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <small className={styles["helper-text"]}>Minimum 8 characters</small>
        )}
      </div>

      {!isLogin && (
        <div className={styles["form-group"]}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {errors.length > 0 && (
        <ul className={styles.errorList}>
          {errors.map((msg, index) => (
            <li key={index} className={styles.error}>
              {msg}
            </li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className={styles["submit-button"]}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : title}
      </button>
    </form>
  );
};
