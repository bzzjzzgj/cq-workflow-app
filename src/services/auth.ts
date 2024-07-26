export const login = async (): Promise<void> => {
  await fetch("/api/login");
};
export const logout = async (): Promise<void> => {
  await fetch("/api/logout");
};