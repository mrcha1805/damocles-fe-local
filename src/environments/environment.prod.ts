import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  env: 'production',
  DigitalCo: {
    endpointApi: 'https://digital.ais.th',
    endpointWeb: 'https://digital.ais.th',
    endpointCdn: 'https://digital-co-prod.azureedge.net',
    Parameters: {
      identityHeader: 'X-Digitalco-Id'
    },
    endpointApiCube:'https://stg-digital.ais.th/actionable-insight/api/analytic/v1'
  },
  Logger: {
    logLevel: NgxLoggerLevel.OFF,
    serverLogLevel: NgxLoggerLevel.OFF,
    disableConsoleLogging: false
  }
};