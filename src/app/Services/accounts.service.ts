import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Credentials } from '../Interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor() { }
  httpClient = inject(HttpClient);
  API_URL = "htttp://localhost:3000"

  login(credentials: Credentials){
    return this.httpClient.post(this.API_URL + "/login", credentials)
  }

}
