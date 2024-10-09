import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alert {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject = new Subject<Alert>();
  public alertState = this.alertSubject.asObservable();

  constructor() {}

  success(message: string) {
    this.alertSubject.next({ message, type: 'success' });
  }

  error(message: string) {
    this.alertSubject.next({ message, type: 'error' });
  }

  info(message: string) {
    this.alertSubject.next({ message, type: 'info' });
  }

  clear() {
    this.alertSubject.next({ message: '', type: 'info' });
  }

}
