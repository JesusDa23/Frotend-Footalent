import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FlotaService } from '../../../Services/flota.service';
import { FlowbiteService } from '../../../Services/flowbite.service';
import { NgFor } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-flota',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule],
  templateUrl: './flota.component.html',
  styleUrl: './flota.component.css'
})
export class FlotaComponent {
  flotas:any = [];
  vehicleForm: FormGroup;

  constructor(private flotaService: FlotaService, private flowbiteService: FlowbiteService, private fb: FormBuilder){
    this.vehicleForm = this.fb.group({
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      vin: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      color: ['', [Validators.required]],
      mileage: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      status: ['', [Validators.required]],
    })
  }

  ngOnInit(){
    this.flowbiteService.loadFlowbite(() => {});
    this.flotaService.getFlotas().subscribe( data => {
      this.flotas = data
      console.log(this.flotas)
    })
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
}
