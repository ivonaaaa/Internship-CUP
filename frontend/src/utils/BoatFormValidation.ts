import { BoatType } from "../types/boats";

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

  const lengthValue = Number(formData.length);
  if (!formData.length.trim()) newErrors.push("Length is required");
  else if (isNaN(lengthValue) || lengthValue <= 0)
    newErrors.push("Length must be a positive number");
  else if (lengthValue < 2 || lengthValue > 100)
    newErrors.push("Length must be between 2 and 50 meters");

  const widthValue = Number(formData.width);
  if (!formData.width.trim()) newErrors.push("Width is required");
  else if (isNaN(widthValue) || widthValue <= 0)
    newErrors.push("Width must be a positive number");
  else if (widthValue < 1 || widthValue > 20)
    newErrors.push("Width must be between 1 and 10 meters");

  if (!formData.registration.trim())
    newErrors.push("Registration number is required");
  else {
    const cleanedRegistration = formData.registration.trim().toUpperCase();
    const registrationParts = cleanedRegistration.split("-");

    if (
      registrationParts.length !== 2 ||
      !/^[A-Z]{2}$/.test(registrationParts[0]) ||
      !/^\d+$/.test(registrationParts[1])
    )
      newErrors.push("Registration must be in the format 'ST-1234'");
    else {
      const numberPart = registrationParts[1];
      if (numberPart.startsWith("0"))
        newErrors.push("Registration number cannot start with zero");
      else if (numberPart.length < 3 || numberPart.length > 6)
        newErrors.push("Registration number must have 3 to 6 digits");
      else formData.registration = cleanedRegistration;
    }
  }

  return newErrors;
};
