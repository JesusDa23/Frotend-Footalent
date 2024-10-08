import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ChecklistComponent } from "../../../../admin/checklist/checklist.component";
import { CheckheaderComponent } from "../../checkheader/checkheader.component";

@Component({
  selector: 'app-sistemadeluces',
  standalone: true,
  imports: [FormsModule, NgFor, ReactiveFormsModule, ChecklistComponent, CheckheaderComponent],
  templateUrl: './sistemadeluces.component.html',
  styleUrl: './sistemadeluces.component.css'
})
export class SistemadelucesComponent {

  lucesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.lucesForm = this.fb.group({
      luzDelanteraAlta: [false],
      luzDelanteraBaja: [false],
      lucesEmergencia: [false],
      lucesDireccionalesDelanteras: [false],
      lucesDireccionalesPosteriores: [false],
      luzReversa: [false],
      lucesdeFrenoPosterior: [false],
    });
  }

  getSistemaLucesData() {
    return this.lucesForm.value;
  }

}