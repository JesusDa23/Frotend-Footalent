import { Component, NgModule } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CdkDropList, CdkDrag, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AccountsService } from '../../../Services/accounts.service';
import { inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AgregarConductorComponent } from '../agregar-conductor/agregar-conductor.component';
import { NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { EditUserComponent } from "../edit-user/edit-user.component";

@Component({
  selector: 'app-conductores',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AgregarConductorComponent, CdkDropList, CdkDrag, RouterLink, NgIf, EditUserComponent],
  templateUrl: './conductores.component.html',
  styleUrl: './conductores.component.css'
})
export class ConductoresComponent {

  accountsService = inject(AccountsService)
  retrievedUsers: any[] = [];
  httpClient = inject(HttpClient)
  isLoading = false;

  constructor(private http: HttpClient, private dniService: AccountsService) { }
  private requestHeaders: HttpHeaders = new HttpHeaders();

  selectedDni: string | null = null; 

  selectDriver(dni: string) {
    this.dniService.changeDni(dni); 
  }

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
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.retrievedUsers, event.previousIndex, event.currentIndex);
  }


  ngOnInit() {
    this.retrieveUsers();
    this.accountsService.isAdmin();

  }

}
