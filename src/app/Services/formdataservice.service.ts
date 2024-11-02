import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormdataserviceService {

  private formDataSubject = new BehaviorSubject<any>({}); // You can define a specific type
  formData$ = this.formDataSubject.asObservable();

  setFormData(data: any): void {
    this.formDataSubject.next(data);
  }

  getFormData(): any {
    return this.formDataSubject.getValue();
  }

  

  constructor() { }
}
