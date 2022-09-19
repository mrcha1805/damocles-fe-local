import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  env: 'dev',
  Singularity: {
    endpointApi: 'https://iot-authv3.ais.co.th',
    endpointWeb: 'https://iot-authv3.ais.co.th',
    Parameters: {
      identityHeader: 'X-Digitalco-Id'
    },
    endpointApiCube:'https://stg-digital.ais.th/actionable-insight/api/analytic/v1'
  },
  Logger: {
    logLevel: NgxLoggerLevel.TRACE,
    serverLogLevel: NgxLoggerLevel.OFF,
    disableConsoleLogging: false
  }
};