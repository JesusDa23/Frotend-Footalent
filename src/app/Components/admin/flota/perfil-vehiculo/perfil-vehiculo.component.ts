import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { FlotaService } from '../../../../Services/flota.service';
import { CommonModule, NgClass, UpperCasePipe } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil-vehiculo',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, NgClass, RouterLink, CommonModule],
  templateUrl: './perfil-vehiculo.component.html',
  styleUrl: './perfil-vehiculo.component.css'
})
export class PerfilVehiculoComponent {
  vehicle: any;  // Aquí recibiremos los datos del vehículo
  vehicleId: any = '';

  isDropdownOpen = false;
  selectedStatus: string = 'Disponible';
  

  constructor(private route: ActivatedRoute, private flotaService: FlotaService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('id');
    this.flotaService.getFlotaById(this.vehicleId).subscribe(data => {
      this.vehicle = data;
    });
  }

  onStatusChange(): void {
        // Actualizar el estado del vehículo en la base de datos
    this.flotaService.updateFlotas(this.vehicle._id, { status: this.vehicle.status })
      .subscribe({
        next: (response) => {
          console.log('Estado actualizado exitosamente', response);
          // Opcional: Aquí podrías mostrar una notificación de éxito o realizar otra acción.
        },
        error: (error) => {
          console.error('Error al actualizar el estado', error);
          // Opcional: Aquí podrías manejar el error, mostrando una notificación de fallo.
        }
      });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown visibility
  }

  selectStatus(status: string) {
    this.selectedStatus = status; // Update the selected status
    this.vehicle.status = status; // Update the vehicle status

    this.onStatusChange(); // Call the update method
    this.isDropdownOpen = false; // Close dropdown after selection
  }

  onEditInspeccion(){
    this.router.navigate(['/admincheck'])
  }

  onClose() {
    this.router.navigate(['/home'])
  }

  onNavegation(){
    this.router.navigate(['/mantenimientos' , this.vehicleId])
  }
}
