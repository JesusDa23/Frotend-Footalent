import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  saveToken(token: any) {
    return this.http.post(`${this.url}/save`, {
      token: token // or simply 'token' if key and variable name are the same
    });
  }
  saveSubscription(subscription: PushSubscription) {
    return this.http.post('/save-subscription', subscription);
  }
  


}
