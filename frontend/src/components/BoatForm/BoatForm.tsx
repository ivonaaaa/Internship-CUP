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
import whiteArrowLeft from "../../assets/images/whiteArrowLeft.svg";
import c from "./BoatForm.module.css";
import "../../styles/App.css";

interface BoatFormProps {
  context?: "registration" | "profile";
  mode?: "create" | "edit" | "info";
  boatId?: number;
  showTitle?: boolean;
}

export const BoatForm: React.FC<BoatFormProps> = ({
  context = "registration",
  mode = "create",
  showTitle = true,
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

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [generalErrors, setGeneralErrors] = useState<string[]>([]);

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

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isReadOnly) return;

    const validationErrors = validateBoatForm(formData);

    if (validationErrors.length > 0) {
      const errorMap: { [key: string]: string } = {};
      const generalErrs: string[] = [];

      validationErrors.forEach((error) => {
        const lowerCaseError = error.toLowerCase();

        if (lowerCaseError.includes("name")) errorMap.name = error;
        else if (lowerCaseError.includes("type")) errorMap.boatType = error;
        else if (lowerCaseError.includes("length")) errorMap.length = error;
        else if (lowerCaseError.includes("width")) errorMap.width = error;
        else if (lowerCaseError.includes("registration"))
          errorMap.registration = error;
        else generalErrs.push(error);
      });

      setFieldErrors(errorMap);
      setGeneralErrors(generalErrs);
      return;
    }

    setFieldErrors({});
    setGeneralErrors([]);

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

              setGeneralErrors(
                Array.isArray(errorMessage) ? errorMessage : [errorMessage]
              );
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
              error || "Failed to register boat. Please try again.";

            setGeneralErrors(
              Array.isArray(errorMessage) ? errorMessage : [errorMessage]
            );
          },
        });
      }
    } catch (err: any) {
      setGeneralErrors([err?.message || "An unexpected error occurred"]);
    }
  };

  return (
    <>
      <img
        src={whiteArrowLeft}
        alt="arrow"
        className="arrow"
        onClick={() => navigate(-1)}
      />
      {showTitle ? (
        <h2 className="boatFormTitle">
          {mode === "info" ? (
            <>Boat details</>
          ) : (
            <>
              Type in your <br />
              boat details
            </>
          )}
        </h2>
      ) : null}

      <form onSubmit={handleSubmit} className="boatForm">
        <div className="formGroup">
          <label htmlFor="name">Boat Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Type in your boat's name"
            value={formData.name}
            onChange={handleChange}
            readOnly={isReadOnly}
            className={isReadOnly ? c.readOnlyInput : ""}
          />
          {fieldErrors.name && (
            <div className="errorText">{fieldErrors.name}</div>
          )}
        </div>

        <div className="formGroup">
          <select
            id="boatType"
            name="boatType"
            value={formData.boatType}
            onChange={handleChange}
            disabled={isReadOnly}
            className={isReadOnly ? c.readOnlyInput : ""}
          >
            <option value="">Boat type</option>
            <option value={BoatType.MOTORBOAT}>Motorboat</option>
            <option value={BoatType.DINGHY}>Dinghy</option>
            <option value={BoatType.YACHT}>Yacht</option>
          </select>
          {fieldErrors.boatType && (
            <div className="errorText">{fieldErrors.boatType}</div>
          )}
        </div>

        <div className={c.rowGroup}>
          <div className="formGroup">
            <label htmlFor="length">Length</label>
            <div className={c.inputWithPrefix}>
              <div className={c.prefixBox}>
                <span>m</span>
                <div className={c.separator} />
              </div>
              <input
                type="number"
                step="0.1"
                id="length"
                name="length"
                placeholder="Enter length"
                value={formData.length}
                onChange={handleChange}
                readOnly={isReadOnly}
                className={isReadOnly ? c.readOnlyInput : ""}
              />
            </div>
            {fieldErrors.length && (
              <div className="errorText">{fieldErrors.length}</div>
            )}
          </div>

          <div className="formGroup">
            <label htmlFor="width">Width</label>
            <div className={c.inputWithPrefix}>
              <div className={c.prefixBox}>
                <span>m</span>
                <div className={c.separator} />
              </div>
              <input
                type="number"
                step="0.1"
                id="width"
                name="width"
                placeholder="Enter width"
                value={formData.width}
                onChange={handleChange}
                readOnly={isReadOnly}
                className={isReadOnly ? c.readOnlyInput : ""}
              />
            </div>
            {fieldErrors.width && (
              <div className="errorText">{fieldErrors.width}</div>
            )}
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="registration">Registration</label>
          <input
            type="text"
            id="registration"
            name="registration"
            placeholder="Type in your boat's registration"
            value={formData.registration}
            onChange={handleChange}
            readOnly={isReadOnly}
            className={isReadOnly ? c.readOnlyInput : ""}
          />
          {fieldErrors.registration && (
            <div className="errorText">{fieldErrors.registration}</div>
          )}
        </div>

        {generalErrors.length > 0 &&
          generalErrors.map((error, index) => (
            <div key={index} className="errorText">
              {error}
            </div>
          ))}

        {mode === "info" && boatId ? (
          <Link to={`/boat/edit/${boatId}`} className={c.editLink}>
            Edit info
          </Link>
        ) : (
          <div className={c.buttonGroup}>
            <button
              type="submit"
              className="submitButton"
              disabled={isCreating || isUpdating}
            >
              {mode === "edit"
                ? isUpdating
                  ? "Updating..."
                  : "Confirm"
                : isCreating
                  ? "Processing..."
                  : "Next"}
            </button>
          </div>
        )}
      </form>
    </>
  );
};
