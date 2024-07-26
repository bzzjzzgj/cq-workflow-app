// utils/validators.ts
export const isEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isRequired = (value: string): boolean => value.trim() !== "";
