import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChecklistService } from '../../../../../Services/checklist.service';
import { CheckheaderComponent } from "../../checkheader/checkheader.component";

@Component({
  selector: 'app-tapasy-otros',
  standalone: true,
  imports: [ReactiveFormsModule, CheckheaderComponent],
  templateUrl: './tapasy-otros.component.html',
  styleUrl: './tapasy-otros.component.css'
})
export class TapasyOtrosComponent {
  tapasYOtros: FormGroup;

  constructor(private fb: FormBuilder, private checklistService: ChecklistService) {
    this.tapasYOtros = this.fb.group({
      tapaMotor: [false],
      tapaMaletero: [false],
      parachoques: [false],
      taponesLlantas: [false],
      limpiaparabrisas: [false]
    });
   }


  // Method to retrieve the form data
  getTapasYOtrosData() {
    return this.tapasYOtros.value;
  }

}
