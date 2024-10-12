// accounts.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials, UserInfo } from '../Interfaces/credentials';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private appUrl: string;
  private requestHeaders: HttpHeaders = new HttpHeaders();

  // Para construir headers 
  private construirHeaders(): void {
    const token = sessionStorage.getItem('token');
    this.requestHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    if (token) {
      this.requestHeaders = this.requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  constructor(private http: HttpClient, private router: Router, private httpService: HttpClientService) {
    this.appUrl = `${environment.apiUrl}/auth`;
  }

  signUp(credentials: UserInfo): Observable<any> {
    this.construirHeaders();
    return this.http.post(this.appUrl + "/register", credentials, { headers: this.requestHeaders });
  }

  getUser(id: number) {
    return this.httpService.getById(`/auth/users/${id}`)
  }

  updateUser(id: number, user: any) {
    return this.httpService.put(user, `/auth/users/${id}`)
  }

  logIn(credentials: Credentials) {

    return this.http.post(this.appUrl + "/login", credentials);
  }

  // Para obtener la lista de todos los conductores
  retrieveUsers(): Observable<any> {
    this.construirHeaders();
    return this.http.get(this.appUrl + '/users', { headers: this.requestHeaders });
  }

  private dniSource = new BehaviorSubject<string | null>(null); // Initialize with null
  currentDni$ = this.dniSource.asObservable(); // Expose observable for other components

  changeDni(dni: string) {
    this.dniSource.next(dni); // Update the DNI value
  }

  logout() {
    // Clear the user session or token from sessionStorage
    sessionStorage.removeItem('token'); // Example of removing a token
    // Redirect to the login page or home page
    this.router.navigate(['/login']);
  }

  isLogedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }

  isAdmin(): boolean {
    const userInfo = sessionStorage.getItem('userInfo');

    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo);

      if (parsedInfo.rol === 'admin') {
        console.log("is admin");
        return true;
      }
      else {
        this.router.navigate(['/homec']);
        return false
      }
    }
    else {
      console.log("not retrieved");
      return false
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
  updatePassword(userId: string, newPassword: string, oldPassword: string, forEmail: boolean = false): Observable<any> {
    return this.http.put(`${this.appUrl}/users/${userId}/password`, { newPassword, oldPassword, forEmail });
  }

  // Método para actualizar el campo isFirstLogin
  updateFirstLogin(userId: string, isFirstLogin: boolean): Observable<any> {
    return this.http.put(`${this.appUrl}/users/${userId}/first-login`, { isFirstLogin });
  }

  requestResetPassword(email: string): Observable<any> {
    return this.http.put(`${this.appUrl}/users/${email}/password-for-email`, {});
  }

  findDataUser(email: string): Observable<any> {
    return this.http.get(`${this.appUrl}/users/${email}`);
  }
=======

>>>>>>> mafe
=======

>>>>>>> 756bd65e09b1a2bef9c951d7484d0fe57150fbe1

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
