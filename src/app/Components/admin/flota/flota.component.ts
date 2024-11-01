import { Component, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
//servicios
import { FlotaService } from '../../../Services/flota.service';
import { FlowbiteService } from '../../../Services/flowbite.service';

import { NgFor, NgIf, NgClass, UpperCasePipe, TitleCasePipe } from '@angular/common';
import { Validators, FormBuilder, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { Vehicle } from '../../models/vehicle.model';
import { EditmodalComponent } from './editmodal/editmodal.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
// componentes
import { PerfilVehiculoComponent } from './perfil-vehiculo/perfil-vehiculo.component';
import { CrearVehiculoComponent } from './crear-vehiculo/crear-vehiculo.component';
import { FooterDesktopComponent } from '../../footer-desktop/footer-desktop.component';



@Component({
  selector: 'app-flota',
  standalone: true,
  imports: [PerfilVehiculoComponent, FooterDesktopComponent, CrearVehiculoComponent, NgFor,ReactiveFormsModule,RouterLink, NgIf, EditmodalComponent, RouterModule, NgClass, UpperCasePipe,HeaderComponent, FormsModule, TitleCasePipe],
  templateUrl: './flota.component.html',
  styleUrl: './flota.component.css'
})
export class FlotaComponent {
  private lastScrollTop = 0;
  flotas:any[] = [];
  vehicleForm: FormGroup;
  isLoading = false;
  isEditMode = false;
  selectedVehicle: Vehicle | null = null;

  searchTerm: string = '';
  filteredForms: any[] = [];  // Inicializar como un array vacío

  constructor(private flotaService: FlotaService, private flowbiteService: FlowbiteService, private fb: FormBuilder){
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
  
  searchForms() {
    const term = this.searchTerm.toLowerCase().trim();
    if (term) {
      this.filteredForms = this.flotas.filter( vehicle =>
        vehicle.make?.toLowerCase().includes(term) ||
           vehicle.model?.toLowerCase().includes(term) ||
           vehicle.plate?.toLowerCase().includes(term)
      );
    } else {
      // Resetear a todos los formularios si no se proporciona un término de búsqueda
      this.filteredForms = [...this.flotas];
    }
  }


  // Método para cargar las flotas
  loadFlotas() {
    this.isLoading = true; // Activa el spinner antes de hacer la solicitud

    this.flotaService.getFlotas().subscribe({
      next: (data: any) => {
        this.flotas = data;
        this.filteredForms = [...this.flotas];
        if (this.flotas.length === 0) {
          Swal.fire('Sin datos', 'No se encontraron vehículos.', 'warning');
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Error!',
          text: 'Hubo un problema al cargar los vehículos. Intentando de nuevo...',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
          confirmButtonColor: '#0A135D'  // Cambia el color del botón de confirmación
        });
      }
    });
  }

    // Función para asignar el logo según la marca
    getLogo(make: string): string {
      switch(make.toLowerCase()) {
        case 'renault':
          return '../../../../assets/logos/model=renault.png';
        case 'ford':
          return '../../../../assets/logos/model=ford.svg';
        // Añadir otros logos según las marcas necesarias
        case 'chevrolet':
          return '../../../../assets/logos/model=chevrolet.svg';
        case 'mercedes':
          return '../../../../assets/logos/model=mercedes.svg';
        case 'caterpillar':
          return '../../../../assets/logos/model=cat.svg';
        case 'nissan':
          return '../../../../assets/logos/model=nissan.svg';
        case 'subaru':
          return '../../../../assets/logos/model=subaru.svg';
        case 'toyota': 
          return '../../../../assets/logos/model=toyota.svg';
        default:
          return '../../../../assets/logos/model=none.svg'; // Logo por defecto
      }
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
  


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const bottomBar = document.getElementById('bottom-bar');

    if (bottomBar) {
      if (currentScroll > this.lastScrollTop) {
        // Scrolling down
        bottomBar.classList.remove('translate-y-0');
        bottomBar.classList.add('translate-y-full');
      } else {
        // Scrolling up
        bottomBar.classList.remove('translate-y-full');
        bottomBar.classList.add('translate-y-0');
      }
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    }
  }

}
