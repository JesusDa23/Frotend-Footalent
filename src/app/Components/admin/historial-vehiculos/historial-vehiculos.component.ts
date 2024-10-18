import { Component } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { TogglemenuComponent } from '../../togglemenu/togglemenu.component';
import { AdmincheckService } from '../../../Services/admincheck.service';
import { AccountsService } from '../../../Services/accounts.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterDesktopComponent } from '../../footer-desktop/footer-desktop.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial-vehiculos',
  standalone: true,
  imports: [TogglemenuComponent, NgFor, NgIf, CommonModule, FooterDesktopComponent, FormsModule],
  templateUrl: './historial-vehiculos.component.html',
  styleUrl: './historial-vehiculos.component.css'
})
export class HistorialVehiculosComponent {
  inspectionForms: any[] = [];
  vehicle: string = ""
  fecha: string = ""
  userDNI: string = "";
  filteredId: string = this.userDNI;
  isLoading = false;

  filterVehicle: string = ''; 
  sortOrder: boolean = true;
  showVehicleFilter: boolean = false;

  constructor(
    private location: Location,
    private accountsService: AccountsService,
    private inspectionService: AdmincheckService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  filteredInspectionForms() {
    return this.inspectionForms.filter(form => {
      const matchesVehicle = form.vehicle.make.toLowerCase().includes(this.filterVehicle.toLowerCase()) ||
        form.vehicle.plate.toLowerCase().includes(this.filterVehicle.toLowerCase());

      return matchesVehicle;
    });
  }

  sortByDate(): void {
    this.inspectionForms.sort((a, b) => {
      const dateA = new Date(a.submissionTime).getTime();
      const dateB = new Date(b.submissionTime).getTime();
      return this.sortOrder ? dateA - dateB : dateB - dateA;
    });

    this.sortOrder = !this.sortOrder;
  }

  toggleVehicleFilters() {
    this.showVehicleFilter = !this.showVehicleFilter;
  }

  retrieveForms() {
    this.isLoading = true;
    this.inspectionService.getInspectionForms().subscribe({
      next: (data) => {
        this.inspectionForms = data;
        this.isLoading = false;

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

