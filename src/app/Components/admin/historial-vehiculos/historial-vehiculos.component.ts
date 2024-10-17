import { Component } from '@angular/core';
import { Location, CommonModule  } from '@angular/common';
import { TogglemenuComponent } from '../../togglemenu/togglemenu.component';
import { AdmincheckService } from '../../../Services/admincheck.service';
import { AccountsService } from '../../../Services/accounts.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-historial-vehiculos',
  standalone: true,
  imports: [TogglemenuComponent, NgFor, NgIf, CommonModule ],
  templateUrl: './historial-vehiculos.component.html',
  styleUrl: './historial-vehiculos.component.css'
})
export class HistorialVehiculosComponent {
  inspectionForms: any[] = [];  // Para almacenar los formularios obtenidos
  vehicle: string = ""
  fecha: string = ""
  userDNI: string = "";
  filteredId: string = this.userDNI;

  constructor(
    private location: Location,
    private accountsService: AccountsService,
    private inspectionService: AdmincheckService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  retrieveForms() {
    this.inspectionService.getInspectionForms().subscribe({
      next: (data) => {
        this.inspectionForms = data;  
      },
      error: (error) => {
        console.error('Error fetching inspection forms:', error);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.accountsService.isAdmin();
    this.retrieveForms()

    this.activatedRoute.params.subscribe(params => {
      this.userDNI = params['state'] || null; 
    });
  }


}

