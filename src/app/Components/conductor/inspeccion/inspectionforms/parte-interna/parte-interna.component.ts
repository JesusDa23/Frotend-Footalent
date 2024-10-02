import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChecklistService } from '../../../../../Services/checklist.service';

@Component({
  selector: 'app-parte-interna',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parte-interna.component.html',
  styleUrl: './parte-interna.component.css'
})
export class ParteInternaComponent {
  parteInterna: FormGroup;

  constructor(private fb: FormBuilder, private checklistService: ChecklistService) {
    this.parteInterna = this.fb.group({
      asientos: [false],
      volante: [false],
      panel: [false],
      espejoRetrovisor: [false],
      alfombra: [false],
      puertasInternas: [false]
    });
   }

  // Method to retrieve the form data
  getParteInternaData() {
    return this.parteInterna.value;
  }

}
