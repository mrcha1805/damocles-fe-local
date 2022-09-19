import { environment } from '@environments/environment';
import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: any = {
  // issuer: 'https://demo.duendesoftware.com',
  loginUrl: environment.authen.domain + '/oauth/authorize',
  logoutUrl: environment.authen.domain + '/logout',
  clientId: environment.authen.clientId, // The "Auth Code + PKCE" client
  dummyClientSecret: environment.authen.clientSecret,
  responseType: 'code',
  oidc: false,
  requestAccessToken: true,
  tokenEndpoint: environment.authen.domain + '/oauth/token',
  customTokenParameters: ['id_token'],
  // redirectUri: window.location.origin + '/home',
  redirectUri: environment.authen.redirectUri,
  // silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'profile', // Ask offline_access to support refresh token refreshes
  // useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
  // silentRefreshTimeout: 5000, // For faster testing
  timeoutFactor: 0.25, // For faster testing
  sessionChecksEnabled: false,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
  nonceStateSeparator: 'semicolon', // Real semicolon gets mangled by Duende ID Server's URI encoding
};
