const authConfig = {
  clientId: "oauth2-pkce-client",
  authorizationEndpoint:
    "http://localhost:8181/realms/ByteFit/protocol/openid-connect/auth",
  tokenEndpoint:
    "http://localhost:8181/realms/ByteFit/protocol/openid-connect/token",
  logoutEndpoint:
    "http://localhost:8181/realms/ByteFit/protocol/openid-connect/logout",
  redirectUri: "http://localhost:5173",
  scope: "openid profile email offline_access",
  autoLogin: false, // Prevent automatic login on app load
  clearURL: false, // Don't clear URL parameters automatically
  onRefreshTokenExpire: (event) => event.logIn(),
  // Add these parameters to force login prompt
  extraAuthParams: {
    prompt: "login", // Force login screen even if user has active session
    max_age: "0", // Force re-authentication
  },
};

export default authConfig;
