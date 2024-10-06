import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FlotaService } from '../../../Services/flota.service';
import { FlowbiteService } from '../../../Services/flowbite.service';
import { NgFor, NgIf, NgClass, UpperCasePipe } from '@angular/common';
import { Validators, FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Category, Vehicle } from '../../models/vehicle.model';
import { HeadercComponent } from '../headerc/headerc.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-homeins',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule, NgIf, NgClass, UpperCasePipe,HeadercComponent],
  templateUrl: './homeins.component.html',
  styleUrl: './homeins.component.css'
})
export class HomeinsComponent {
  
  flotas:any = [];
  vehicleForm: FormGroup;

  isEditMode = false;
  selectedVehicle: Vehicle | null = null;

  constructor(
    private flotaService: FlotaService, 
    private flowbiteService: FlowbiteService, 
    private router: Router,
    private fb: FormBuilder){
    this.vehicleForm = this.fb.group({
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1886)]],
      vin: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      color: [''],
      mileage: [0],
      owner: [''],
      status: ['', [Validators.required]]

    });
  }

  ngOnInit(){
    this.flowbiteService.loadFlowbite(() => {});
    this.loadFlotas();
    if (this.selectedVehicle) {
      this.isEditMode = true;
    }
  }

  loadFlotas() {
    this.flotaService.getFlotas().subscribe(data => {
      this.flotas = data;
    });
  }

  onSubmit() {
    // Verificamos si el formulario es válido antes de continuar
    if (this.vehicleForm.valid) {
      // Llamamos al servicio para crear una nueva flota con los datos del formulario
      this.flotaService.createNewFlota(this.vehicleForm.value)
        .subscribe({
          next: data => {
            // Mostramos la alerta de éxito
            Swal.fire({
              title: 'Vehículo registrado!',
              text: 'El vehículo ha sido registrado exitosamente.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              // Reiniciamos el formulario después de cerrar la alerta
              this.vehicleForm.reset();
            });
          },
          error: (err) => {
            // Manejamos los errores en caso de que la operación falle
            Swal.fire({
              title: 'Error!',
              text: 'Hubo un problema al registrar el vehículo. Por favor, intenta de nuevo.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            console.error(err);  // También registramos el error en la consola para depuración
          }
        });
    } else {
      // Si el formulario no es válido, mostramos un mensaje de advertencia
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos requeridos.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

  onDelete(id:any){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este Vehiculo? Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.flotaService.deleteFlotas(id).subscribe((data) => {
          console.log(data);
          Swal.fire({
            title: '¡Eliminado!',
            text: 'El producto ha sido eliminado con éxito.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        });
      }
    });
  }

  onEdit(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
  }
  onVehicleUpdated(id:any, updatedVehicle: Vehicle) {
    this.flotaService.updateFlotas(id,updatedVehicle).subscribe(() => {
      this.loadFlotas
      Swal.fire('Updated!', 'The vehicle has been updated.', 'success');
    });
  }

  onVehicleCreated(newVehicle: Vehicle) {
    this.flotaService.createNewFlota(newVehicle).subscribe(() => {
      this.loadFlotas();
      Swal.fire('Created!', 'The new vehicle has been created.', 'success');
    });
  }
  
  openCreateVehicleModal() {
    this.selectedVehicle = null;  // Set to null for creating a new vehicle
    this.isEditMode = true;  // Set mode to create
  }
  onCloseModal() {
    this.isEditMode = false;
    this.selectedVehicle = null;
  }







  openins(category: Category) {
    console.log(this.flotas)
    this.router.navigate(['/inspeccion2', category])
  }
  

}
