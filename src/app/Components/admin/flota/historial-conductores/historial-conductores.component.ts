import { Component } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../../../Services/accounts.service';
import { FooterDesktopComponent } from '../../../footer-desktop/footer-desktop.component';
import { AdmincheckService } from '../../../../Services/admincheck.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial-conductores',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FooterDesktopComponent, FormsModule],
  templateUrl: './historial-conductores.component.html',
  styleUrl: './historial-conductores.component.css'
})
export class HistorialConductoresComponent {
  vehicle: any;
  isLoading = false;
  vehicleId!: string;
  driverHistory: { driverName: string; submissionDate: Date }[] = [];

  constructor(
    private location: Location,
    private accountsService: AccountsService,
    private route: ActivatedRoute,
    private adminCheckService: AdmincheckService
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.vehicleId = this.route.snapshot.paramMap.get('vehicleId')!;
    this.isLoading = true;
    this.accountsService.isAdmin();

    this.loadforms();
  }

  loadforms() {
    this.adminCheckService.getDriversByVehicleId(this.vehicleId).subscribe({
      next: (data) => {
        this.driverHistory = data.map(item => ({
          driverName: item.driverName,
          submissionDate: new Date(item.submissionDate)
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching driver history:', error);
  
        // Log the response to see if it's HTML
        if (error.error instanceof ProgressEvent) {
          console.error('Network error:', error);
        } else {
          console.error('Response body:', error.error);
        }
  
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar el historial de conductores',
          text: error?.error?.message || 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
  
}