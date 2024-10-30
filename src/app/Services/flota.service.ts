import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';
import { vehicleData } from '../Components/models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class FlotaService {

  constructor(private http: HttpClientService ) { }

  createNewFlota(data: any) {
    return this.http.post(data, '/vehicles/save');
  }

  getFlotas(){
    return this.http.get(`/vehicles/rtv`);
  }

  getFlotaById(id: number){
    return this.http.get(`/vehicles/rtv/${id}`)
  }
  getFlotaByIdc(id: number): Observable<any> {  
    return this.http.get(`/vehicles/${id}`);
  }
  
  deleteFlotas(id:number){
    return this.http.delete(`/vehicles/del/${id}` );
  }

  updateFlotas(id:number, data:any){
    return this.http.put( data,`/vehicles/update/${id}` );
  }
}
