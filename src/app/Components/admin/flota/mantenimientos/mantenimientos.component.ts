import { NgClass, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MantenimientoService } from '../../../../Services/mantenimiento.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TogglemenuComponent } from "../../../togglemenu/togglemenu.component";
import { FlotaService } from '../../../../Services/flota.service';

@Component({
  selector: 'app-mantenimientos',
  standalone: true,
  imports: [FormsModule, NgFor, TogglemenuComponent, RouterModule],
  templateUrl: './mantenimientos.component.html',
  styleUrl: './mantenimientos.component.css'
})
export class MantenimientosComponent {
  mantenimientos: any[] = [];
  vehicleId: any = ''
  flotas:any = [] 
  mantenimientoSelect: any[] = []

  constructor(
    private mantenimientoService: MantenimientoService,
    private cdr: ChangeDetectorRef, 
    private route: ActivatedRoute,
    private flotaService: FlotaService 
  ) { }

  ngOnInit() {
    // Al iniciar, obtenemos los mantenimientos desde el servidor
    this.vehicleId = this.route.snapshot.paramMap.get('vehicleId');
    console.log(this.vehicleId)
    this.obtenerMantenimientos();
    this.loadFlotas()
  }

  obtenerMantenimientos() {
    this.mantenimientoService.getMantenimientoById(this.vehicleId).subscribe(
      (data: any) => {
        this.mantenimientos = data.map((mantenimiento: any) => {
          // Formatear la fecha para que se ajuste al campo input date
          mantenimiento.fecha = new Date(mantenimiento.fecha).toISOString().split('T')[0];
          return mantenimiento;  // Asegúrate de que el backend devuelve un array de mantenimientos
        });

      },
      (error) => {
        console.error('Error al obtener mantenimientos:', error);
      }
    );
  }

  loadFlotas() {
    this.flotaService.getFlotas().subscribe(data => {
      this.flotas = data;
    });
  }





  agregarMantenimiento() {
    const nuevoMantenimiento = {
      vehicleId: this.vehicleId || 0,  // Aquí debes referenciar el vehículo por su ObjectId
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
    this.mantenimientoService.deleteMantenimientos(id).subscribe(
      () => {
        this.mantenimientos = this.mantenimientos.filter(m => m._id !== id);
        this.cdr.detectChanges();
        this.obtenerMantenimientos();
      },
      (error) => {
        console.error('Error al eliminar mantenimiento:', error);
      }
    );
  }

  actualizarMantenimiento(mantenimiento: any) {
    mantenimiento.fecha = new Date(mantenimiento.fecha).toISOString();
    this.mantenimientoService.updateMantenimientos(mantenimiento._id, mantenimiento).subscribe(
      (data: any) => {
        const index = this.mantenimientos.findIndex(m => m._id === data._id);
        if (index !== -1) {
          this.mantenimientos[index] = data;
          this.cdr.detectChanges();
          this.obtenerMantenimientos();
        }
      },
      (error) => {
        console.error('Error al actualizar mantenimiento:', error);
      }
    );
  }
}
