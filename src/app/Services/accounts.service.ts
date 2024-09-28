// accounts.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials, UserInfo } from '../Interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private appUrl: string;
  requestHeaders!: HttpHeaders;
  constructor(private http: HttpClient) {
    this.appUrl = "http://localhost:3000/api/v1/auth";
  }

  signUp(credentials: UserInfo) {
    return this.http.post(this.appUrl + "/register", credentials);
  }

  logIn(credentials: Credentials) {
    return this.http.post(this.appUrl + "/login", credentials);
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
          asd
  */
}
