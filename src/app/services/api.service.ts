import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IIndustry } from '../model/industry';
import { AppConfigService } from './app-config.service';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  protected globalConfig = AppConfigService.settings;
  endpoint: string = this.globalConfig.apiEndpoint;
  industry: string = this.globalConfig.industryRoute;

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  dynamicIndustryMockup(): Observable<HttpResponse<IIndustry>> {
    return this.http.get<IIndustry>('assets/data/industry-mockup.json', {
      observe: 'response',
    });
  }
  getIndustryAPI(): Observable<IIndustry> {
    return this.http
      .get<IIndustry>(this.endpoint + this.industry, this.httpOption)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('error api:', error);
          console.log(`HttpHeader status: ${error.status} ${error.statusText}`);
          console.log(
            `resultCode: ${error.error.resultCode}, resultDescription: ${error.error.resultDescription}, diagnosticMessage: ${error.error.diagnosticMessage}`
          );
          return throwError(error);
        })
      );
  }
}
