const authConfig = {
  clientId: "oauth2-pkce-client",
  authorizationEndpoint:
    "http://localhost:8181/realms/ByteFit/protocol/openid-connect/auth",
  tokenEndpoint:
    "http://localhost:8181/realms/ByteFit/protocol/openid-connect/token",
  redirectUri: "http://localhost:5173",
  scope: "openid profile email offline_access",
  autoLogin: false, // Prevent automatic login on app load
  clearURL: false, // Don't clear URL parameters automatically
  onRefreshTokenExpire: (event) => event.logIn(),
};

export default authConfig;
