import { Component, NgModule } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

import { AccountsService } from '../../../Services/accounts.service';
import { inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import { AgregarConductorComponent } from '../agregar-conductor/agregar-conductor.component';
import { NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conductores',
  standalone: true,
  imports: [HeaderComponent, AgregarConductorComponent, CdkDropList, CdkDrag, RouterLink, NgIf],
  templateUrl: './conductores.component.html',
  styleUrl: './conductores.component.css'
})
export class ConductoresComponent {

  accountsService = inject(AccountsService)
  retrievedUsers: any[] = [];
  httpClient = inject(HttpClient)
  isLoading = false;

  constructor(private http: HttpClient) { }
  private requestHeaders: HttpHeaders = new HttpHeaders(); 


  retrieveUsers() {
    this.isLoading = true
    this.accountsService.retrieveUsers().subscribe((res: any) => {
      if (res) {
        this.retrievedUsers = res.data
        this.isLoading = false
      } else {
        console.log("No se obtuvieron usuarios");
      }
    })


    // this.accountsService.retrieveUsers().subscribe({
    //   next: (data) => {
    //     this.retrieveUsers = data;
    //     if (this.retrieveUsers.length === 0) {
    //       Swal.fire('Sin datos', 'No se encontraron vehículos.', 'warning');
    //     }
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     Swal.fire({
    //       title: 'Error!',
    //       text: 'Hubo un problema al cargar los vehículos. Intentando de nuevo...',
    //       icon: 'error',
    //       confirmButtonText: 'Intentar de nuevo',
    //       confirmButtonColor: '#0A135D'  // Cambia el color del botón de confirmación
    //     });
    //   }
    // });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.retrievedUsers, event.previousIndex, event.currentIndex);
  }


  ngOnInit() {
    this.retrieveUsers();
    this.accountsService.isAdmin();

  }

}
