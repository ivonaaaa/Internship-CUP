export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^@]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string, minLength = 8): boolean => {
  return password.length >= minLength;
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^\+(\d{1,4})\d{7,14}$/;
  return phoneRegex.test(phoneNumber);
};

export const validateMatch = (value: string, confirmValue: string): boolean => {
  return value === confirmValue;
};

export const validateRequired = (value: string): boolean => {
  return value.trim() !== "";
};

export const validateAuthForm = (
  formData: {
    username: string;
    email: string;
    phoneNumber: string;
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
    if (!validateRequired(formData.username))
      errors.push("Username is required.");

    if (!validatePhoneNumber(formData.phoneNumber)) {
      errors.push(
        "Phone number must start with + followed by country code and 7-14 digits."
      );
    }

    if (!validateMatch(formData.password, formData.confirmPassword))
      errors.push("Passwords do not match.");
  }

  return errors;
};
