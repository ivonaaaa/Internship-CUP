interface ProfileFormData {
  name: string;
  surname: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const validateProfileForm = (
  formData: ProfileFormData,
  showPasswordChange: boolean
): string[] => {
  const errors: string[] = [];

  if (!formData.name.trim())
    errors.push("Name is required");

  if (!formData.surname.trim())
    errors.push("Surname is required");

  if (showPasswordChange) {
    if (!formData.currentPassword)
      errors.push("Current password is required");

    if (!formData.newPassword)
      errors.push("New password is required");

    if (formData.newPassword !== formData.confirmPassword)
      errors.push("Passwords don't match");

    if (formData.newPassword && formData.newPassword.length < 8)
      errors.push("Password must be at least 8 characters");
  }

  return errors;
};