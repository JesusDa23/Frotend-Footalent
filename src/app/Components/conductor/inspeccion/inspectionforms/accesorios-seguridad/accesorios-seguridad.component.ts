import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { InspeccionComponent } from '../../inspeccion.component';
import { CommonModule } from '@angular/common';
import { CheckheaderComponent } from "../../checkheader/checkheader.component";

@Component({
  selector: 'app-accesorios-seguridad',
  standalone: true,
  imports: [ReactiveFormsModule, InspeccionComponent, CheckheaderComponent],
  templateUrl: './accesorios-seguridad.component.html',
  styleUrl: './accesorios-seguridad.component.css'
})
export class AccesoriosSeguridadComponent {

  accesoriosSeguridad: FormGroup;

  constructor(private fb: FormBuilder) {
    this.accesoriosSeguridad = this.fb.group({
      extintor: [false],
      botiquin: [false],
      gato: [false],
      senales: [false],
      llantaRepuesto: [false]
    });
  }
  getAccesoriosSeguridadData() {
    return this.accesoriosSeguridad.value;
  }

}
