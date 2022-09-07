import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UpdateUserProfile } from '@models/update-user-profile.model';
import { UserProfileData } from '@models/user-profile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {

  constructor(private http: HttpClient) { }

  getUserProfile(token: string): Observable<UserProfileData> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<UserProfileData>(environment.authen.beEndpoint + '/userprofile?token=' + token, {headers: headers});
  }

  postUserProfile(requestData: FormData):Observable<UpdateUserProfile>{
    let headers = new HttpHeaders();
    return this.http.post<UpdateUserProfile>(environment.authen.beEndpoint + '/userprofile', requestData, {headers: headers});
  }

}
