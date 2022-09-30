import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AppConfigService {
  static settings: ActionableConfig;

  constructor(private http: HttpClient) {}
  load() {
    const configFile = `assets/config/endpoint.json`;
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(configFile)
        .toPromise()
        .then((response: any) => {
          AppConfigService.settings = <ActionableConfig>response;

          console.log('Config Loaded');
          // console.log(AppConfigService.settings);
          resolve();
        })
        .catch((response: any) => {
          reject(`Could not load the config file`);
        });
    });
  }
}

export interface ActionableConfig {
  apiEndpoint: 'http://104.43.115.28:23001/api/v1';
  industryRoute: string;
  userProfile: string;
  projectRoute: '/project';
  criterion: string;
}
