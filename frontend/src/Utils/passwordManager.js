export const validatePassword = (password) => {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>\-_\[\]\\\/+=~`;' ])[A-Za-z\d!@#$%^&*(),.?":{}|<>\-_\[\]\\\/+=~`;' ]{8,}$/;

  if (!password || password.trim().length === 0) {
    return "Password is required.";
  }

  if (!strongPasswordRegex.test(password)) {
    return "Password must be at least 8 characters and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
  }

  return null; // valid
};
