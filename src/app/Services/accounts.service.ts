// accounts.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials, UserInfo } from '../Interfaces/credentials';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private appUrl: string;
  private requestHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.appUrl = `${environment.apiUrl}/v1/auth`;
  }

  signUp(credentials: UserInfo) {
    return this.http.post(this.appUrl + "/register", credentials);
  }

  logIn(credentials: Credentials) {
    return this.http.post(this.appUrl + "/login", credentials);
  }

  // Para construir headers 
  private construirHeaders(): void {
    const token = sessionStorage.getItem('token');
    this.requestHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    if (token) {
      this.requestHeaders = this.requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  }
  // Para obtener la lista de todos los conductores
  retrieveUsers(): Observable<any> {
    this.construirHeaders(); 
    return this.http.get(this.appUrl + '/users', { headers: this.requestHeaders });
  }



  // Para colocarle la cabecera de autorización a la petición, se debe de hacer de la siguiente manera

  // private construirHeaders() {
  //   if (sessionStorage.getItem('token') != null) {
  //     let token = sessionStorage.getItem('token');
  //     this.requestHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  //   }
  // }

  // Manera de uso:
  /*
        nombreMetodo() {
          this.construirHeaders();
          return this.http.get(this.appUrl + "/ruta", { headers: this.requestHeaders });
        }
          
  */
}
