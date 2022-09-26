import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  env: 'stg',
  authen: {
    domain: 'https://stg-digital.ais.th/auth/v3.1',
    clientId: 'wO6kzH+uR2FMCbco8D4MACn6EJ1sRRFag7vkkVSBV+9CkFtdFVEZaA==',
    clientSecret: 'clientSecret',
    redirectUri: 'https://stg-digital.ais.th/actionable-insight/home',
    beEndpoint: 'https://stg-digital.ais.th/actionable-insight/actionable-insight-be/api/v1'
  },
  DigitalCo: {
    endpointApi: 'https://stg-digital.ais.th',
    endpointWeb: 'https://stg-digital.ais.th',
    endpointCdn: 'https://digital-co-stg.azureedge.net',
    Parameters: {
      identityHeader: 'X-Digitalco-Id'
    },
    endpointApiCube: 'https://stg-digital.ais.th/actionable-insight/actionable-insight-cube/analytic/v1'
  },
  Logger: {
    logLevel: NgxLoggerLevel.TRACE,
    serverLogLevel: NgxLoggerLevel.OFF,
    disableConsoleLogging: false
  }
};
