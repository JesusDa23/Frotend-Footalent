import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';


@Injectable({
  providedIn: 'root'
})
export class ReportarIncidenteService {


  constructor(private http: HttpClientService) { }

  crearReporte( nuevoReporte:any ){
    return this.http.post(nuevoReporte, '/incidents/save');
  }

}
