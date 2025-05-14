import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { validateAuthForm } from "../../utils/AuthFormValidation";
import c from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";

type AuthFormProps = {
  mode: "login" | "register";
};

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [generalErrors, setGeneralErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
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

  const createFieldErrorsMap = (
    validationErrors: string[]
  ): { [key: string]: string } => {
    const errorMap: { [key: string]: string } = {};
    const generalErrors: string[] = [];

    validationErrors.forEach((error) => {
      const lowerCaseError = error.toLowerCase();

      if (lowerCaseError.includes("email")) errorMap.email = error;
      else if (
        lowerCaseError.includes("first name") ||
        (lowerCaseError.includes("name") &&
          !lowerCaseError.includes("last") &&
          !lowerCaseError.includes("surname"))
      ) {
        errorMap.name = error;
      } else if (
        lowerCaseError.includes("last name") ||
        lowerCaseError.includes("surname")
      ) {
        errorMap.surname = error;
      } else if (
        lowerCaseError.includes("password") &&
        lowerCaseError.includes("confirm")
      ) {
        errorMap.confirmPassword = error;
      } else if (lowerCaseError.includes("password")) errorMap.password = error;
      else generalErrors.push(error);
    });

    setGeneralErrors(generalErrors);

    return errorMap;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isRegisterMode = mode === "register";
    const validationErrors = validateAuthForm(formData, isRegisterMode);

    if (validationErrors.length > 0) {
      const errorMap = createFieldErrorsMap(validationErrors);
      setFieldErrors(errorMap);
      return;
    }

    setFieldErrors({});
    setGeneralErrors([]);
    setIsLoading(true);

    try {
      if (isRegisterMode) {
        await register({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password,
        });
        navigate("/register-boat");
      } else {
        await login(formData.email, formData.password);
        navigate("/");
      }
    } catch (err: any) {
      const errorMessages = getErrorMessage(err);
      setGeneralErrors(errorMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const isLogin = mode === "login";
  const title = isLogin ? "Sign In" : "Next";

  return (
    <form onSubmit={handleSubmit} className={c.authForm}>
      <h2>{isLogin ? title : "Sign Up"}</h2>

      {!isLogin && (
        <>
          <div className="formGroup">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="First Name"
              value={formData.name}
              onChange={handleChange}
            />
            {fieldErrors.name && (
              <div className={c.errorText}>{fieldErrors.name}</div>
            )}
          </div>

          <div className="formGroup">
            <label htmlFor="surname">Last Name</label>
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Last Name"
              value={formData.surname}
              onChange={handleChange}
            />
            {fieldErrors.surname && (
              <div className={c.errorText}>{fieldErrors.surname}</div>
            )}
          </div>
        </>
      )}

      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {fieldErrors.email && (
          <div className={c.errorText}>{fieldErrors.email}</div>
        )}
      </div>

      <div className="formGroup">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {fieldErrors.password && (
          <div className={c.errorText}>{fieldErrors.password}</div>
        )}
      </div>

      {!isLogin && (
        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {fieldErrors.confirmPassword && (
            <div className={c.errorText}>{fieldErrors.confirmPassword}</div>
          )}
        </div>
      )}

      {generalErrors.length > 0 && (
        <ul className="errorList">
          {generalErrors.map((msg, index) => (
            <li key={index} className="error">
              {msg}
            </li>
          ))}
        </ul>
      )}

      <button type="submit" className={c.submitButton} disabled={isLoading}>
        {isLoading ? "Processing..." : title}
      </button>
    </form>
  );
};
