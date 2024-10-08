import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bullet } from '../Components/models/bullet.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
private apiUrl = `${environment.apiUrl}/checklist`; // Adjust to your backend URL

private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

constructor(private http: HttpClient) {}

saveInspectionData(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/inspectionForms`, data, {headers: this.headers });
}
listInspectionData(): Observable<any> {
  return this.http.get(`${this.apiUrl}/inspectionForms`, {headers: this.headers });
}

  
}
