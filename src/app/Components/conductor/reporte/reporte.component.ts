import { Component } from '@angular/core';
import { HeadercComponent } from "../headerc/headerc.component";
import { ChecklistService } from '../../../Services/checklist.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportarIncidenteService } from '../../../Services/reportar-incidente.service';
import Swal from 'sweetalert2';
import { error } from 'console';
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


  constructor(private checklistService: ChecklistService, private reportService: ReportarIncidenteService, private fb: FormBuilder  ) {
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

  onSubmit(){
    if(this.reporteForm.valid){
      this.crearReporte();
    }
    else{
      
    }
    
  }

  crearReporte(){
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
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear el reporte',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0A135D'
      });
      console.error('Error al crear el reporte:', error);
    }
  }
    )
  }

  // createChecklist(): void {
  //   this.checklistService.createChecklist(this.checklistreport).subscribe({
  //     next: (response: Checklistreport) => {
  //       console.log('Checklist created successfully:', response);
  //     },
  //     error: (error: any) => {
  //       console.error('Error creating checklist:', error);
  //     }
  //   });
  // }

}
