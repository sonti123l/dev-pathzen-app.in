export const getUserFromStorage = () => {
  const user = localStorage.getItem("user_details");
  return user ? JSON.parse(user) : null;
};