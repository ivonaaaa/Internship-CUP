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

  const getErrorMessage = (err: any): string[] => {
    const errorData = err?.response?.data;
    const status = err?.response?.status;

    switch (status) {
      case 401:
        return [
          "Invalid email or password. Please check your credentials and try again.",
        ];

      case 400:
        return ["Invalid input data. Please check your details and try again."];

      case 409:
        return [
          "This email or username is already registered. Please use different credentials.",
        ];

      case 500:
        return [
          "The server encountered an error. Please try again in a moment.",
        ];
    }

    if (Array.isArray(errorData?.message)) return errorData.message;

    if (typeof errorData?.message === "string") return [errorData.message];

    if (err.message) {
      if (err.message.includes("Network Error")) {
        return [
          "Unable to connect to the server. Please check your internet connection.",
        ];
      }
      if (err.message.includes("timeout"))
        return ["The request timed out. Please try again later."];

      return [err.message];
    }

    return ["An unknown error occurred."];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      setErrors(getErrorMessage(err));
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
