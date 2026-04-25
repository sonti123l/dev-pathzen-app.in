export const getUserFromStorage = () => {
  if (typeof window === "undefined") return null; 

  const data = localStorage.getItem("user_details");
  return data ? JSON.parse(data) : null;
};