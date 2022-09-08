// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  env: 'dev',
  authen: {
    domain: 'https://stg-digital.ais.th/auth/v3.1',
    clientId: 'wO6kzH+uR2FMCbco8D4MACn6EJ1sRRFag7vkkVSBV+9CkFtdFVEZaA==',
    clientSecret: 'clientSecret',
    redirectUri: 'https://stg-digital.ais.th/actionable-insight/home',
    beEndpoint: "http://104.43.115.28:23000/api/v1"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
