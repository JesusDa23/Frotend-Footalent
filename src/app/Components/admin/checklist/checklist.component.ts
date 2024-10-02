import { Component, OnInit } from '@angular/core';
import { ChecklistService } from '../../../Services/checklist.service';
import { Checklist } from '../../models/checklist.model';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.css'
})
export class ChecklistComponent {

  checklists: Checklist[] = [];

  constructor(private checklistService: ChecklistService) { }

  ngOnInit(): void {
    this.getAllChecklists();
  }

  // Fetch all checklists
  getAllChecklists(): void {
    this.checklistService.getChecklists().subscribe((data) => {
      this.checklists = data;
    }, (error) => {
      console.error('Error fetching checklists:', error);
    });
  }

}
