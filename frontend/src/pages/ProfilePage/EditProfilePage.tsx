import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useUpdateUser } from "../../api/user/useUserQueries";
import styles from "./EditProfilePage.module.css";

export const EditProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const updateUser = useUpdateUser();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        surname: user.surname || "",
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors([]);
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.name.trim()) {
      newErrors.push("Name is required");
    }

    if (!formData.surname.trim()) {
      newErrors.push("Surname is required");
    }

    if (showPasswordChange) {
      if (!formData.currentPassword) {
        newErrors.push("Current password is required");
      }

      if (!formData.newPassword) {
        newErrors.push("New password is required");
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.push("Passwords don't match");
      }

      if (formData.newPassword && formData.newPassword.length < 8) {
        newErrors.push("Password must be at least 8 characters");
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!user) {
      setErrors(["User information not available"]);
      return;
    }

    try {
      const updateData: any = {
        name: formData.name,
        surname: formData.surname,
      };

      if (showPasswordChange) {
        updateData.password = formData.newPassword;
        updateData.currentPassword = formData.currentPassword;
      }

      await updateUser.mutateAsync({
        id: user.id,
        data: updateData,
      });

      navigate("/profile");
    } catch (err: any) {
      const errorMessage = err || "Failed to update profile";
      setErrors(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
    }
  };

  if (!user) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  return (
    <div className={styles.editProfilePage}>
      <div className={styles.header}>
        <h2>Edit profile</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.editForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Enter your surname"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value="••••••••••"
            disabled
            className={styles.passwordField}
          />
        </div>

        <button
          type="button"
          className={styles.editPasswordButton}
          onClick={() => setShowPasswordChange(!showPasswordChange)}
        >
          {showPasswordChange ? "Cancel password change" : "Edit password"}
        </button>

        {showPasswordChange && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="currentPassword">Current password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="newPassword">New password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
            </div>
          </>
        )}

        {errors.length > 0 && (
          <ul className={styles.errorList}>
            {errors.map((error, index) => (
              <li key={index} className={styles.error}>
                {error}
              </li>
            ))}
          </ul>
        )}

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.confirmButton}
            disabled={updateUser.isPending}
          >
            {updateUser.isPending ? "Updating..." : "Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
};
