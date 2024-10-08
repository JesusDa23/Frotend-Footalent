import { Component } from '@angular/core';
import { HeadercComponent } from "../headerc/headerc.component";
import { Checklistreport } from '../../models/checklist.model';
import { ChecklistService } from '../../../Services/checklist.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [ HeadercComponent, FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {

  checklistreport: Checklistreport = new Checklistreport(); // Initialize an empty checklist

  constructor(private checklistService: ChecklistService) {}

  onSubmit(): void {
    this.createChecklist();
  }

  createChecklist(): void {
    this.checklistService.createChecklist(this.checklistreport).subscribe({
      next: (response: Checklistreport) => {
        console.log('Checklist created successfully:', response);
        // Reset the form or show a success message
      },
      error: (error: any) => {
        console.error('Error creating checklist:', error);
        // Handle error, show error message, etc.
      }
    });
  }

}
