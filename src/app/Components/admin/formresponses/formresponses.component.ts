import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdmincheckService } from '../../../Services/admincheck.service';
import { AccountsService } from '../../../Services/accounts.service';

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

  constructor(private inspectionService: AdmincheckService, private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accountsService.isAdmin();

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
