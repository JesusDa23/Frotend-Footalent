import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estado-cubiertas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './estado-cubiertas.component.html',
  styleUrl: './estado-cubiertas.component.css'
})
export class EstadoCubiertasComponent implements OnInit{

  estadoCubiertas: FormGroup;

  constructor(private fb: FormBuilder) {
    this.estadoCubiertas = this.fb.group({
      cubiertaDelanteraIzquierda: [false],
      cubiertaDelanteraDerecha: [false],
      cubiertaTraseraIzquierda: [false],
      cubiertaTraseraDerecha: [false],
      cubiertaRepuesto: [false]
    });
   }

  ngOnInit(): void {
    
  }

  // Method to retrieve the form data
  getEstadoCubiertasData() {
    return this.estadoCubiertas.value;
  }

}
