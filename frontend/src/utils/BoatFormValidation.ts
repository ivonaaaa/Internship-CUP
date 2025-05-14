import { BoatType } from "../types/boats";

const registrationRegex = /^[A-Za-z]{2}-\d{4}$/;

export const validateBoatForm = (formData: {
  name: string;
  boatType: BoatType | "";
  length: string;
  width: string;
  registration: string;
}): string[] => {
  const newErrors: string[] = [];

  if (!formData.name.trim()) newErrors.push("Boat name is required");
  else if (formData.name.trim().length < 3)
    newErrors.push("Boat name must be at least 3 characters long");

  if (!formData.boatType) newErrors.push("Boat type is required");

  if (!formData.length.trim()) newErrors.push("Length is required");
  else if (isNaN(Number(formData.length)) || Number(formData.length) <= 0)
    newErrors.push("Length must be a positive number");

  if (!formData.width.trim()) newErrors.push("Width is required");
  else if (isNaN(Number(formData.width)) || Number(formData.width) <= 0)
    newErrors.push("Width must be a positive number");

  if (!formData.registration.trim())
    newErrors.push("Registration number is required");
  else if (!registrationRegex.test(formData.registration))
    newErrors.push("Registration must be in the format 'ST-1234'");

  return newErrors;
};
