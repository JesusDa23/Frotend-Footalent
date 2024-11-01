import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MantenimientoService } from '../../../../Services/mantenimiento.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TogglemenuComponent } from "../../../togglemenu/togglemenu.component";
import { FlotaService } from '../../../../Services/flota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimientos',
  standalone: true,
  imports: [FormsModule, NgFor, TogglemenuComponent, RouterModule, NgIf, NgClass],
  templateUrl: './mantenimientos.component.html',
  styleUrl: './mantenimientos.component.css'
})
export class MantenimientosComponent {
  mantenimientos: any[] = [];
  vehicleId: any = ''
  flotas: any = []
  mantenimientoSelect: any[] = []
  isLoading = false;

  constructor(
    private mantenimientoService: MantenimientoService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private flotaService: FlotaService
  ) { }

  ngOnInit() {
    this.isLoading = true;  // Activar el spinner al iniciar la carga
    this.vehicleId = this.route.snapshot.paramMap.get('vehicleId');
    console.log(this.vehicleId);
    this.obtenerMantenimientos();
    this.loadFlotas();
  }

  obtenerMantenimientos() {
    this.mantenimientoService.getMantenimientoById(this.vehicleId).subscribe(
      (data: any) => {
        this.mantenimientos = data.map((mantenimiento: any) => {
          // Formatear la fecha para que se ajuste al campo input date
          mantenimiento.fecha = new Date(mantenimiento.fecha).toISOString().split('T')[0];
          return mantenimiento;
        });
        this.isLoading = false;  // Desactivar el spinner cuando termine la carga
      },
      (error) => {
        console.error('Error al obtener mantenimientos:', error);
        this.isLoading = false;  // Desactivar el spinner si ocurre un error
      }
    );
  }

  loadFlotas() {
    this.flotaService.getFlotas().subscribe(
      (data: any) => {
        this.flotas = data;
        this.isLoading = false;  // Desactivar el spinner cuando termine la carga
      },
      (error) => {
        console.error('Error al cargar flotas:', error);
        this.isLoading = false;  // Desactivar el spinner si ocurre un error
      }
    );
  }


  toggleDropdown(mantenimiento: any) {
    // Cerrar todos los demás dropdowns
    this.mantenimientos.forEach(m => {
      if (m !== mantenimiento) {
        m.isDropdownOpen = false;
      }
    });

    // Abrir o cerrar el dropdown del mantenimiento seleccionado
    mantenimiento.isDropdownOpen = !mantenimiento.isDropdownOpen;
  }

  selectEstado(mantenimiento: any, estado: string) {
    mantenimiento.estado = estado;
    mantenimiento.isDropdownOpen = false; // Cerrar el dropdown al seleccionar un estado
    this.actualizarMantenimiento(mantenimiento);
  }


  agregarMantenimiento() {
    const nuevoMantenimiento = {
      vehicleId: this.vehicleId,  // Aquí debes referenciar el vehículo por su ObjectId
      estado: 'Pendiente',
      descripcion: 'n/a',
      fecha: new Date,  // Fecha actual
      categoria: 'Mecánico',
      coste: 0
    };

    this.mantenimientoService.createNewMantenimiento(nuevoMantenimiento).subscribe(
      (data: any) => {
        // Añadir el nuevo mantenimiento al array
        this.mantenimientos.push(data);
        this.cdr.detectChanges();  // Forzar la detección de cambios
      },
      (error) => {
        console.error('Error al agregar mantenimiento:', error);
      }
    );
  }

  eliminarMantenimiento(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de eliminar este mantenimiento.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#0A135D',   // Color personalizado del botón de confirmar
      cancelButtonColor: '#A22B2B'     // Color personalizado del botón de cancelar
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, procede con la eliminación
        this.mantenimientoService.deleteMantenimientos(id).subscribe(
          () => {
            // Eliminar el mantenimiento del arreglo local
            this.mantenimientos = this.mantenimientos.filter(m => m._id !== id);
            this.cdr.detectChanges();
            this.obtenerMantenimientos();

            // Mostrar un SweetAlert de éxito
            Swal.fire({
              title: 'Eliminado',
              text: 'El mantenimiento ha sido eliminado correctamente.',
              icon: 'success',
              confirmButtonColor: '#0A135D'   // Color del botón de confirmación
            });
          },
          (error) => {
            console.error('Error al eliminar mantenimiento:', error);

            // Mostrar un SweetAlert en caso de error
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar el mantenimiento.',
              icon: 'error',
              confirmButtonColor: '#0A135D'
            });
          }
        );
      } else {
        // Si el usuario cancela la eliminación
        Swal.fire({
          title: 'Cancelado',
          text: 'El mantenimiento no fue eliminado.',
          icon: 'info',
          confirmButtonColor: '#0A135D'
        });
      }
    });
  }



  actualizarMantenimiento(mantenimiento: any) {
    mantenimiento.fecha = new Date(mantenimiento.fecha).toISOString();
    console.log(mantenimiento)

    const { vehicleId, descripcion, fecha } = mantenimiento

    if (!vehicleId || !descripcion || !fecha) {
      Swal.fire({
        title: 'Error',
        text: 'Faltan datos para actualizar el mantenimiento.',
        icon: 'error',
        confirmButtonColor: '#0A135D'
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#0A135D',   // Optional: Customize button colors
      cancelButtonColor: '#A22B2B'
    }).then((result) => {
      if (result.isConfirmed) {

        this.mantenimientoService.updateMantenimientos(mantenimiento._id, mantenimiento).subscribe(
          (data: any) => {
            const index = this.mantenimientos.findIndex(m => m._id === data._id);
            if (index !== -1) {
              this.mantenimientos[index] = data;
              this.cdr.detectChanges();
              this.obtenerMantenimientos();
              console.log("se guardo");
            }
          },
          (error) => {
            console.error('Error al actualizar mantenimiento:', error);
          }
        );

        Swal.fire({
          title: 'Se ha guardado el mantenimiento',
          icon: 'success',
          confirmButtonColor: '#0A135D'
        });
      }
    });
  }


  }


