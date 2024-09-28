import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlotaService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  createNewFlota(data: any){
    return this.http.post(`${this.apiUrl}/v1/vehicles/save`,{data})
  }

  getFlotas(){
    return this.http.get(`${this.apiUrl}/v1/vehicles/rtv`);
  }

  deleteFlotas(id:any){
    return this.http.delete(`${this.apiUrl}/v1/vehicles/del/${id}`)
  }
}
