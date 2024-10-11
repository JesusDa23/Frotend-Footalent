import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

import { AccountsService } from '../../../Services/accounts.service';
import { inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import { AgregarConductorComponent } from '../agregar-conductor/agregar-conductor.component';

@Component({
  selector: 'app-conductores',
  standalone: true,
  imports: [HeaderComponent, AgregarConductorComponent, RouterLink],
  templateUrl: './conductores.component.html',
  styleUrl: './conductores.component.css'
})
export class ConductoresComponent {

  accountsService = inject(AccountsService)
  retrievedUsers: any[] = [];
  httpClient = inject(HttpClient)

  constructor(private http: HttpClient) { }
  private requestHeaders: HttpHeaders = new HttpHeaders(); 


  retrieveUsers() {
    this.accountsService.retrieveUsers().subscribe((res: any) => {
      if (res) {
        this.retrievedUsers = res.data
      } else {
        console.log("No se obtuvieron usuarios");
      }
    })
  }

  ngOnInit() {
    this.retrieveUsers();
    this.accountsService.isAdmin();

  }

}
