import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private sglProfile: any;
  constructor() { }

  decodeSglId(sglId: string) {
    this.sglProfile = jwt_decode(sglId);
  }

  get SglProfile() {
    return this.sglProfile;
  }
}
