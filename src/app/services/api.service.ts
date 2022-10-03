import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IIndustry } from '../model/industry-interface';
import { AppConfigService } from './app-config.service';
import { catchError } from 'rxjs/operators';
import { IProject, IProjectModel } from '../model/project-interface';
import { IProjectTemplate } from 'app/model/project-template-interface';
import { IGlobal } from 'app/model/global-interface';
import { ISaveProject } from 'app/model/save-project-interface';
import { ICriterion } from 'app/model/criterion-interface';

import { ILocation } from 'app/model/location-interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  protected globalConfig = AppConfigService.settings;
  endpoint: string = environment.authen.beEndpoint;
  industry: string = '/industry';
  userProfile: string = '/userprofile';
  project: string = '/project';
  criterion: string = '/criterion';
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
  dynamicProjectMockup(): Observable<HttpResponse<IProjectModel>> {
    return this.http.get<IProjectModel>('assets/data/project-mockup.json', {
      observe: 'response',
    });
  }
  getProjectAPI(id: string): Observable<IProjectModel> {
    return this.http
      .get<IProjectModel>(
        this.endpoint + this.userProfile + '?profile_id=' + id,
        this.httpOption
      )
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

  dynamicProjectTemplateMockup(): Observable<HttpResponse<IProjectTemplate>> {
    return this.http.get<IProjectTemplate>(
      'assets/data/project-template-all-mockup.json',
      {
        observe: 'response',
      }
    );
  }
  getProjectTemplateAPI(id: string): Observable<IProjectTemplate> {
    return this.http
      .get<IProjectTemplate>(
        this.endpoint + this.project + '?profile_id=' + id,
        this.httpOption
      )
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
  getProjectTemplateByProductAPI(id: string): Observable<IProjectTemplate> {
    return this.http
      .get<IProjectTemplate>(
        this.endpoint + this.project + '?product_id=' + id,
        this.httpOption
      )
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
  deleteProjectAPI(id: string): Observable<IGlobal> {
    return this.http
      .delete<IGlobal>(
        this.endpoint + this.project + '?project_id=' + id,
        this.httpOption
      )
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

  //Save Project
  dynamicSaveProjectMockup(): Observable<HttpResponse<ISaveProject>> {
    return this.http.get<ISaveProject>('assets/data/save-project-mockup.json', {
      observe: 'response',
    });
  }

  postSaveProjectAPI(req: any): Observable<ISaveProject> {
    return this.http
      .post<ISaveProject>(this.endpoint + this.project, req, this.httpOption)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage;
          console.log('error api:', error);
          console.log(`HttpHeader status: ${error.status} ${error.statusText}`);
          console.log(
            `resultCode: ${error.error.resultCode}, resultDescription: ${error.error.resultDescription}, diagnosticMessage: ${error.error.diagnosticMessage}`
          );
          switch (error.status) {
            case 403:
              if (error.error.diagnosticMessage == undefined) {
                errorMessage = 'You do not have permission to access.';
              } else if (
                error.error.diagnosticMessage
                  .toLowerCase()
                  .trim()
                  .indexOf('name is duplicate name') != -1
              ) {
                errorMessage = 'name is duplicate name.';
              } else {
                errorMessage = 'You do not have permission to access.';
              }
              break;
          }
          return throwError(error);
        })
      );
  }

  replaceSaveProjectAPI(req: any, id: string): Observable<ISaveProject> {
    return this.http
      .post<ISaveProject>(
        this.endpoint + this.project + '/' + id,
        req,
        this.httpOption
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage;
          console.log('error api:', error);
          console.log(`HttpHeader status: ${error.status} ${error.statusText}`);
          console.log(
            `resultCode: ${error.error.resultCode}, resultDescription: ${error.error.resultDescription}, diagnosticMessage: ${error.error.diagnosticMessage}`
          );

          return throwError(error);
        })
      );
  }

  //Get Criterion
  dynamicCriterionMockup(): Observable<HttpResponse<ICriterion>> {
    return this.http.get<ICriterion>('assets/data/criterion-mockup.json', {
      observe: 'response',
    });
  }
  getCriterionAPI(
    projectId: string,
    featureGroupId: string
  ): Observable<ICriterion> {
    return this.http
      .get<ICriterion>(
        `${this.endpoint}${this.criterion}/${projectId}/${featureGroupId}`,
        this.httpOption
      )
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

  //Get Location
  dynamicFilterLocationMockup(): Observable<HttpResponse<ILocation>> {
    return this.http.get<ILocation>('assets/data/filter-location.json', {
      observe: 'response',
    });
  }
  getFilterLocationAPI(): Observable<ILocation> {
    return this.http
      .get<ILocation>(this.endpoint + '/location', this.httpOption)
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
