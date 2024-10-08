import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdmincheckService } from '../../../Services/admincheck.service';

@Component({
  selector: 'app-formresponses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formresponses.component.html',
  styleUrl: './formresponses.component.css'
})
export class FormresponsesComponent {
  inspectionForms: any[] = [];  // To hold the fetched forms
  loading: boolean = true;

  constructor(private inspectionService: AdmincheckService) {}

  ngOnInit(): void {
    this.inspectionService.getInspectionForms().subscribe({
      next: (data) => {
        this.inspectionForms = data;  // Assign data from API to inspectionForms
        this.loading = false;
      },
      error: (error) => {
        // console.error('Error fetching inspection forms:', error);
        this.loading = false;
      }
    });
  }

}
