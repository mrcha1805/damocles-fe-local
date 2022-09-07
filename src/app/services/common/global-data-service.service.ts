import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataServiceService {

  constructor() { }

  private showModal =new BehaviorSubject<string>('');
  getShowModal = this.showModal.asObservable();

  setShowModal(value: string){
    this.showModal.next(value);
  }
}
