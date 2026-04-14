const getUserDetails = localStorage.getItem("user details") ?? "";
export const userDetails = JSON.parse(getUserDetails);
