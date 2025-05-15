export const validateCardDetails = (
  name: string,
  cardNumber: string,
  expiration: string,
  cvv: string
) => {
  const errors: { [key: string]: string } = {};

  if (!name.trim()) errors.name = "Name and surname are required.";
  else if (name.trim().split(" ").length < 2)
    errors.name = "Please enter both name and surname.";
  else if (!/^[A-Za-zÀ-ÿ\s'-]{4,}$/.test(name.trim()))
    errors.name =
      "Name must contain only letters, spaces, hyphens or apostrophes.";

  const cardRegex = /^[0-9]{16}$/;
  if (!cardNumber.trim()) errors.cardNumber = "Card number is required.";
  else if (!cardRegex.test(cardNumber))
    errors.cardNumber = "Card number must be 16 digits.";

  const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiration.trim()) errors.expiration = "Expiration date is required.";
  else if (!expirationRegex.test(expiration))
    errors.expiration = "Expiration date must be in MM/YY format.";

  const cvvRegex = /^[0-9]{3}$/;
  if (!cvv.trim()) errors.cvv = "CVV is required.";
  else if (!cvvRegex.test(cvv)) errors.cvv = "CVV must be 3 digits.";

  return errors;
};
