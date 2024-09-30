import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private apiUrl = environment.apiUrl
  private token
  private headers

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
   }

  post(data: any, api: string){
    return this.http.post(`${this.apiUrl}${api}`, data, {headers: this.headers})
  }

  get( api: string){
    return this.http.get(`${this.apiUrl}${api}`, {headers: this.headers})
  }

  getById(api: string){
    return this.http.get(`${this.apiUrl}${api}`, {headers: this.headers})
  }

  delete(api: string){
    return this.http.delete(`${this.apiUrl}${api}`, {headers: this.headers})
  }

  put(data: any, api: string){
    return this.http.put(`${this.apiUrl}${api}`, data, {headers: this.headers} )
  }
}
