import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateBoat,
  useUpdateBoat,
  useBoat,
} from "../../api/boat/useBoatQueries";
import { BoatType } from "../../types/boats";
import { useAuth } from "../../contexts/AuthContext";
import { validateBoatForm } from "../../utils/BoatFormValidation";
import c from "./BoatForm.module.css";

interface BoatFormProps {
  context?: "registration" | "profile";
  mode?: "create" | "edit" | "info";
  boatId?: number;
}

export const BoatForm: React.FC<BoatFormProps> = ({
  context = "registration",
  mode = "create",
  boatId,
}) => {
  const navigate = useNavigate();
  const { mutate: createBoat, isPending: isCreating } = useCreateBoat();
  const { mutate: updateBoat, isPending: isUpdating } = useUpdateBoat();
  const { data: boatData, isLoading: isLoadingBoat } = useBoat(
    mode !== "create" && boatId ? boatId : 0
  );

  const { user } = useAuth();

  const [formData, setFormData] = useState<{
    userId: number;
    name: string;
    registration: string;
    boatType: BoatType | "";
    length: string;
    width: string;
  }>({
    userId: user?.id || 0,
    name: "",
    registration: "",
    boatType: "",
    length: "",
    width: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{
    name: string[];
    boatType: string[];
    length: string[];
    width: string[];
    registration: string[];
    general: string[];
  }>({
    name: [],
    boatType: [],
    length: [],
    width: [],
    registration: [],
    general: [],
  });

  const isReadOnly = mode === "info";

  useEffect(() => {
    if (mode !== "create" && boatData) {
      setFormData({
        userId: boatData.userId,
        name: boatData.name || "",
        registration: boatData.registration || "",
        boatType: boatData.boatType || "",
        length: boatData.length ? String(boatData.length) : "",
        width: boatData.width ? String(boatData.width) : "",
      });
    }
  }, [mode, boatData]);

  if (!user) return null;

  if (mode !== "create" && isLoadingBoat)
    return <div className={c.loadingMessage}>Loading boat data...</div>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (isReadOnly) return;

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "boatType" ? (value as BoatType) : value,
    });

    // Clear error for this field when user starts typing
    setFieldErrors((prev) => ({
      ...prev,
      [name]: [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isReadOnly) return;

    const validationErrors = validateBoatForm(formData);

    if (validationErrors.length > 0) {
      // Map general errors to specific fields
      const mappedErrors = {
        name: validationErrors.filter((err) => err.includes("name")),
        boatType: validationErrors.filter((err) => err.includes("type")),
        length: validationErrors.filter((err) => err.includes("Length")),
        width: validationErrors.filter((err) => err.includes("Width")),
        registration: validationErrors.filter((err) =>
          err.includes("Registration")
        ),
        general: validationErrors.filter(
          (err) =>
            !err.includes("name") &&
            !err.includes("type") &&
            !err.includes("Length") &&
            !err.includes("Width") &&
            !err.includes("Registration")
        ),
      };

      setFieldErrors(mappedErrors);
      return;
    }

    setFieldErrors({
      name: [],
      boatType: [],
      length: [],
      width: [],
      registration: [],
      general: [],
    });

    try {
      const boatData = {
        userId: formData.userId,
        name: formData.name,
        registration: formData.registration,
        boatType: formData.boatType || undefined,
        length: Number(formData.length),
        width: Number(formData.width),
      };

      if (mode === "edit" && boatId) {
        updateBoat(
          {
            id: boatId,
            data: boatData,
          },
          {
            onSuccess: () => {
              navigate("/profile");
            },
            onError: (error: any) => {
              const errorMessage =
                error?.response?.data?.message ||
                "Failed to update boat. Please try again.";

              setFieldErrors((prev) => ({
                ...prev,
                general: Array.isArray(errorMessage)
                  ? errorMessage
                  : [errorMessage],
              }));
            },
          }
        );
      } else {
        createBoat(boatData, {
          onSuccess: () => {
            if (context === "profile") navigate("/profile");
            else navigate("/register-subscription");
          },
          onError: (error: any) => {
            const errorMessage =
              error?.response?.data?.message ||
              "Failed to register boat. Please try again.";

            setFieldErrors((prev) => ({
              ...prev,
              general: Array.isArray(errorMessage)
                ? errorMessage
                : [errorMessage],
            }));
          },
        });
      }
    } catch (err: any) {
      setFieldErrors((prev) => ({
        ...prev,
        general: [err?.message || "An unexpected error occurred"],
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={c.boatForm}>
      <h2>{mode === "edit" ? "Edit Boat" : "Boat information"}</h2>

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
          readOnly={isReadOnly}
          className={isReadOnly ? c.readOnlyInput : ""}
        />
        {fieldErrors.name.map((error, index) => (
          <div key={`name-error-${index}`} className={c.fieldError}>
            {error}
          </div>
        ))}
      </div>

      <div className={c.formGroup}>
        <select
          id="boatType"
          name="boatType"
          value={formData.boatType}
          onChange={handleChange}
          required
          disabled={isReadOnly}
          className={isReadOnly ? c.readOnlyInput : ""}
        >
          <option value="">Boat type</option>
          <option value={BoatType.MOTORBOAT}>Motorboat</option>
          <option value={BoatType.DINGHY}>Dinghy</option>
          <option value={BoatType.YACHT}>Yacht</option>
        </select>
        {fieldErrors.boatType.map((error, index) => (
          <div key={`type-error-${index}`} className={c.fieldError}>
            {error}
          </div>
        ))}
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
              readOnly={isReadOnly}
              className={isReadOnly ? c.readOnlyInput : ""}
            />
          </div>
          {fieldErrors.length.map((error, index) => (
            <div key={`length-error-${index}`} className={c.fieldError}>
              {error}
            </div>
          ))}
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
              readOnly={isReadOnly}
              className={isReadOnly ? c.readOnlyInput : ""}
            />
          </div>
          {fieldErrors.width.map((error, index) => (
            <div key={`width-error-${index}`} className={c.fieldError}>
              {error}
            </div>
          ))}
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
          readOnly={isReadOnly}
          className={isReadOnly ? c.readOnlyInput : ""}
        />
        {fieldErrors.registration.map((error, index) => (
          <div key={`reg-error-${index}`} className={c.fieldError}>
            {error}
          </div>
        ))}
      </div>

      {fieldErrors.general.length > 0 && (
        <ul>
          {fieldErrors.general.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}

      {mode === "info" ? (
        <Link to={`/boat/edit/${boatId}`}>Edit info</Link>
      ) : (
        <button
          type="submit"
          className={c.submitButton}
          disabled={isCreating || isUpdating}
        >
          {mode === "edit"
            ? isUpdating
              ? "Updating..."
              : "Update Boat"
            : isCreating
              ? "Processing..."
              : "Next"}
        </button>
      )}
    </form>
  );
};
