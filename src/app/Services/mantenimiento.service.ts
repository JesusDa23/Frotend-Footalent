import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  constructor(private http: HttpClientService) { }

  createNewMantenimiento(data: any){
    return this.http.post(data,'/mantenimiento');
  }

  getMantenimientos(){
    return this.http.get(`/mantenimiento`);
  }

  getMantenimientoById(id: number){
    return this.http.get(`/mantenimiento/${id}`)
  }

  deleteMantenimientos(id:number){
    return this.http.delete(`/mantenimiento/${id}` );
  }

  updateMantenimientos(id:number, data:any){
    return this.http.put( data,`/mantenimiento/${id}` );
  }
}
