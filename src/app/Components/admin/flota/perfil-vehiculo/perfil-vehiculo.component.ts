import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { FlotaService } from '../../../../Services/flota.service';
import { CommonModule, NgClass, UpperCasePipe } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AccountsService } from '../../../../Services/accounts.service';
import Swal from 'sweetalert2';
import { AdmincheckService } from '../../../../Services/admincheck.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-perfil-vehiculo',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, NgClass, RouterLink, CommonModule],
  templateUrl: './perfil-vehiculo.component.html',
  styleUrl: './perfil-vehiculo.component.css'
})
export class PerfilVehiculoComponent {
  vehicle: any = {};  // Aquí recibiremos los datos del vehículo
  vehicleId: any = '';
  isLoading = false;
  isDropdownOpen = false;
  selectedStatus: string = 'Disponible';

  categoriesNames: any[] = []

  constructor(private accountsService: AccountsService, private route: ActivatedRoute, private flotaService: FlotaService, private location: Location, private router: Router, private categoriesService: AdmincheckService) { }

  ngOnInit(): void {
    this.isLoading = true;  // Activar el spinner antes de la carga de datos
    this.vehicleId = this.route.snapshot.paramMap.get('id');

    this.flotaService.getFlotaById(this.vehicleId).subscribe({
      next: (data) => {
        this.vehicle = data;
        this.loadCategories();
        this.isLoading = false;  // Desactivar el spinner cuando los datos se carguen
      },
      error: (error) => {
        console.error('Error al obtener los datos del vehículo', error);
        this.isLoading = false;  // Desactivar el spinner también si hay un error
      }
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

  loadCategories() {
    this.categoriesService.getCategories().subscribe(data => {
      this.categoriesNames = data;

      // Verificar si la categoría seleccionada del vehículo existe entre las opciones
      const selectedCategory = this.categoriesNames.find(category => category._id === this.vehicle.category);
      if (selectedCategory) {
        this.vehicle.category = selectedCategory._id;  // Asignar la categoría seleccionada
      }
    });
  }

  listarConductores() {
    this.router.navigate(['/historial-conductores', this.vehicleId]);
  }

  guardarPerfil() {
    // Guardar los cambios en el vehículo
    this.flotaService.updateFlotas(this.vehicleId, this.vehicle)
      .subscribe({
        next: (response) => {
          this.onStatusChange();
          Swal.fire({
            position: "center",
            icon: "success",  // Corrige el icono a 'success'
            title: "Se guardó exitosamente",  // Pequeño ajuste ortográfico
            showConfirmButton: false,
            timer: 1000
          });  // Cierra correctamente el paréntesis
        },
        error: (error) => {
          console.error('Error al actualizar el perfil', error);
        }
      });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown visibility
  }

  selectStatus(status: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Cambiar el estado del vehículo a "${status}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0a135d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Actualiza el estado en el objeto local del vehículo
        this.vehicle.status = status;
  
        // Llamada al servicio para actualizar el vehículo en el backend
        this.flotaService.updateFlotas(this.vehicleId, this.vehicle).subscribe({
          next: () => {
            // Actualiza el estado seleccionado en la interfaz solo si la actualización en el backend es exitosa
            this.selectedStatus = status;
            this.isDropdownOpen = false;
  
            // Muestra mensaje de éxito
            Swal.fire({
              title: 'Estado cambiado',
              text: `El estado del vehículo ha sido cambiado a "${status}"`,
              icon: 'success',
              confirmButtonColor: '#0a135d'
            });
          },
          error: (err) => {
            console.error('Error al actualizar el estado:', err);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al cambiar el estado. Inténtalo nuevamente.',
              icon: 'error',
              confirmButtonColor: '#0a135d'
            });
          }
        });
      }
    });
  }
  

  onEditInspeccion() {
    this.router.navigate(['/admincheck'])
  }

  onClose() {
    this.router.navigate(['/home'])
  }

  onNavegation() {
    this.router.navigate(['/mantenimientos', this.vehicleId])
  }
}
