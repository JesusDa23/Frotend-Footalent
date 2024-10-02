import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-parte-externa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './parte-externa.component.html',
  styleUrl: './parte-externa.component.css'
})
export class ParteExternaComponent {
  
  parteExterna: FormGroup;

  constructor(private fb: FormBuilder) {
    this.parteExterna = this.fb.group({
      parachoques: [false],
      puertas: [false],
      ventanas: [false],
      espejos: [false],
      faros: [false],
      carroceria: [false]
    });
   }


  // Method to retrieve the form data
  getParteExternaData() {
    return this.parteExterna.value;
  }

}
