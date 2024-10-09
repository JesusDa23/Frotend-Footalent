import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FlotaService } from '../../../../Services/flota.service';
import { NgClass, UpperCasePipe } from '@angular/common';
import { Location } from '@angular/common';
import { AccountsService } from '../../../../Services/accounts.service';


@Component({
  selector: 'app-perfil-vehiculo',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, NgClass, RouterLink],
  templateUrl: './perfil-vehiculo.component.html',
  styleUrl: './perfil-vehiculo.component.css'
})
export class PerfilVehiculoComponent {
  vehicle: any;  // Aquí recibiremos los datos del vehículo

  constructor(private accountsService: AccountsService, private route: ActivatedRoute, private flotaService: FlotaService, private location: Location) { }

  ngOnInit(): void {
    const vehicleId:any = this.route.snapshot.paramMap.get('id');
    this.flotaService.getFlotaById(vehicleId).subscribe(data => {
      this.vehicle = data;
    });
    this.accountsService.isAdmin();

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

  onClose(): void {
    this.location.back();
  }
}
