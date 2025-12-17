/**
 * Validations et sanitization
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one digit');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validatePhoneNumber = (phone: string): boolean => {
  // Format simple: au moins 8 chiffres
  const phoneRegex = /^\d{8,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const sanitizeInput = (input: string): string => {
  return input.trim().slice(0, 255);
};
