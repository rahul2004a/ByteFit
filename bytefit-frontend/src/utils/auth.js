// Utility function to check if user is authenticated
export const isUserAuthenticated = (token, user) => {
  return !!(token || user || localStorage.getItem("token"));
};

// Utility function to get user info from multiple sources
export const getUserInfo = (tokenData, user) => {
  return (
    tokenData || user || JSON.parse(localStorage.getItem("user") || "null")
  );
};

// Utility function to clear all authentication data
export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
};
