import { Component } from '@angular/core';
import { HeadercComponent } from "../headerc/headerc.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportarIncidenteService } from '../../../Services/reportar-incidente.service';
import Swal from 'sweetalert2';
import { FooterDesktopComponent } from "../../footer-desktop/footer-desktop.component";
@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [HeadercComponent, FormsModule, ReactiveFormsModule, FooterDesktopComponent],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {

  // checklistreport: Checklistreport = new Checklistreport(); 
  reporteForm: FormGroup;


  constructor(private reportService: ReportarIncidenteService, private fb: FormBuilder  ) {
    this.reporteForm = this.fb.group({
      date: ['', [Validators.required]],
      description: ['', [Validators.required]],
      passengers:['', [Validators.required]],
      vehicleStateDescription: ['', [Validators.required]]
    })
  }

  // onSubmit(): void {
  //   this.createChecklist();
  // }
  onSubmit() {
    if (this.reporteForm.valid) {
      this.crearReporte();
    } else {
      // Muestra mensaje de error si el formulario no está completo o tiene errores
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos requeridos antes de enviar.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0A135D'
      });
    }
  }
  
  crearReporte() {
    this.reportService.crearReporte(this.reporteForm.value).subscribe({
      next: (data) => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'El reporte ha sido creado exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0A135D'
        });
      },
      error: (error) => {
        let errorMessage = 'Hubo un problema al crear el reporte';
  
        // Si el backend devuelve un mensaje de error específico, úsalo
        if (error?.error?.message) {
          errorMessage = error.error.message;
        }
  
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0A135D'
        });
        // console.error('Error al crear el reporte:', error);
      }
    });
  }
  
}
