import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBoat } from "../../api/boat/useBoatQueries";
import { BoatType } from "../../types/boats";
import { useAuth } from "../../contexts/AuthContext";
import { validateBoatForm } from "../../utils/BoatFormValidation";
import c from "./BoatForm.module.css";

export const BoatForm: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: createBoat, isPending } = useCreateBoat();
  const { user } = useAuth();

  if (!user) return null;

  const [formData, setFormData] = useState<{
    userId: number;
    name: string;
    registration: string;
    boatType: BoatType | "";
    length: string;
    width: string;
  }>({
    userId: user.id,
    name: "",
    registration: "",
    boatType: "",
    length: "",
    width: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "boatType" ? (value as BoatType) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateBoatForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    try {
      const boatData = {
        userId: formData.userId,
        name: formData.name,
        registration: formData.registration,
        boatType: formData.boatType || undefined,
        length: Number(formData.length),
        width: Number(formData.width),
      };

      createBoat(boatData, {
        onSuccess: () => {
          navigate("/register-subscription");
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            "Failed to register boat. Please try again.";
          setErrors(
            Array.isArray(errorMessage) ? errorMessage : [errorMessage]
          );
        },
      });
    } catch (err: any) {
      setErrors([err?.message || "An unexpected error occurred"]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={c.boatForm}>
      <h2>Boat information</h2>

      <div className={c.formGroup}>
        <label htmlFor="name">Boat Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Type in boat's name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={c.formGroup}>
        <select
          id="boatType"
          name="boatType"
          value={formData.boatType}
          onChange={handleChange}
          required
        >
          <option value="">Boat type</option>
          <option value={BoatType.MOTORBOAT}>Motorboat</option>
          <option value={BoatType.DINGHY}>Dinghy</option>
          <option value={BoatType.YACHT}>Yacht</option>
        </select>
      </div>

      <div className={c.rowGroup}>
        <div className={c.mInputGroup}>
          <label htmlFor="length">Length</label>
          <div className={c.inputWithPrefix}>
            <span>m</span>
            <input
              type="number"
              step="0.1"
              id="length"
              name="length"
              placeholder="10"
              value={formData.length}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={c.mInputGroup}>
          <label htmlFor="width">Width</label>
          <div className={c.inputWithPrefix}>
            <span>m</span>
            <input
              type="number"
              step="0.1"
              id="width"
              name="width"
              placeholder="3"
              value={formData.width}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className={c.formGroup}>
        <label htmlFor="registration">Registration</label>
        <input
          type="text"
          id="registration"
          name="registration"
          placeholder="ST-1234"
          value={formData.registration}
          onChange={handleChange}
          required
        />
      </div>

      {errors.length > 0 && (
        <ul className={c.errorList}>
          {errors.map((msg, index) => (
            <li key={index} className={c.error}>
              {msg}
            </li>
          ))}
        </ul>
      )}

      <button type="submit" className={c.submitButton} disabled={isPending}>
        {isPending ? "Processing..." : "Next"}
      </button>
    </form>
  );
};
