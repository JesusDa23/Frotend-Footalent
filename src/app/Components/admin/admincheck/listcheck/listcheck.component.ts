import { Component } from '@angular/core';
import { Section } from '../../../models/section.model';
import { ActivatedRoute } from '@angular/router';
import { AdmincheckService } from '../../../../Services/admincheck.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listcheck',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listcheck.component.html',
  styleUrl: './listcheck.component.css'
})
export class ListcheckComponent {

  sections: Section[] = [];
  categoryId: string | null = null;

  constructor(private route: ActivatedRoute, private admincheckService: AdmincheckService) {}

  ngOnInit(): void {
    // Get the category ID from the route
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (this.categoryId) {
      this.loadSections();
    }
  }

  loadSections(): void {
    this.admincheckService.getSectionsByCategory(this.categoryId!).subscribe(
      (data: Section[]) => {
        this.sections = data;
      },
      (error) => {
        console.error('Error loading sections:', error);
      }
    );
  }

}
