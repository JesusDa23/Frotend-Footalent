import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Credentials } from '../Interfaces/credentials';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(credentials: Credentials) {
    return this.http.post(this.url + "/login", credentials); // Corrected the typo here
  }
}
