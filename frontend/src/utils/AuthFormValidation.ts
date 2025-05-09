export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^@]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string, minLength = 8): boolean => {
  return password.length >= minLength;
};

export const validateMatch = (value: string, confirmValue: string): boolean => {
  return value === confirmValue;
};

export const validateRequired = (value: string): boolean => {
  return value.trim() !== "";
};

export const validateAuthForm = (
  formData: {
    email: string;
    name: string;
    surname: string;
    password: string;
    confirmPassword: string;
  },
  isRegisterMode: boolean
): string[] => {
  const errors: string[] = [];

  if (!validateEmail(formData.email))
    errors.push("Please enter a valid email address.");

  if (!validatePassword(formData.password))
    errors.push("Password must be at least 8 characters long.");

  if (isRegisterMode) {
    if (!validateRequired(formData.name))
      errors.push("First name is required.");

    if (!validateRequired(formData.surname))
      errors.push("Last name is required.");

    if (!validateMatch(formData.password, formData.confirmPassword))
      errors.push("Passwords do not match.");
  }

  return errors;
};
