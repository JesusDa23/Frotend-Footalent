import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChecklistService } from '../../../../../Services/checklist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documentacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './documentacion.component.html',
  styleUrl: './documentacion.component.css'
})
export class DocumentacionComponent {
  documentacion: FormGroup;

  constructor(private fb: FormBuilder) {
    this.documentacion = this.fb.group({
      tarjetaPropiedad: [false],
      soat: [false],
      revisionTecnica: [false],
      impuestoVehicular: [false],
      manualVehiculo: [false]
    });
   }


  // Method to retrieve the form data
  getDocumentacionData() {
    return this.documentacion.value;
  }

}
