import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  env: 'dev',
  authen: {
    domain: 'https://104.43.115.28:23020/auth/v3.1',
    clientId: 'wO6kzH+uR2FMCbco8D4MACn6EJ1sRRFag7vkkVSBV+9CkFtdFVEZaA==',
    clientSecret: 'clientSecret',
    redirectUri: 'http://104.43.115.28:23001/home', 
    beEndpoint: "http://104.43.115.28:23001/api/v1"
  },
  DigitalCo: {
    endpointApi: 'https://iot-authv3.ais.co.th',
    endpointWeb: 'https://iot-authv3.ais.co.th',
    Parameters: {
      identityHeader: 'X-Digitalco-Id'
    },
    endpointApiCube: 'http://localhost:4000/analytic/v1'
  },
  Logger: {
    logLevel: NgxLoggerLevel.TRACE,
    serverLogLevel: NgxLoggerLevel.OFF,
    disableConsoleLogging: false
  }
};