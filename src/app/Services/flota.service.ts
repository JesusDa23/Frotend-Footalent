import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FlotaService {

  constructor(private http: HttpClientService) { }

  createNewFlota(data: any){
    return this.http.post(data,'/vehicles/save');
  }

  getFlotas(){
    return this.http.get(`/vehicles/rtv`);
  }

  getFlotaById(id: number){
    return this.http.get(`/vehicles/rtv/${id}`)
  }

  deleteFlotas(id:number){
    return this.http.delete(`/vehicles/del/${id}` );
  }

  updateFlotas(id:number, data:any){
    return this.http.put( data,`/vehicles/update/${id}` );
  }
}
