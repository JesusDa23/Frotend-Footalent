import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdmincheckService } from '../../../Services/admincheck.service';

@Component({
  selector: 'app-sections-by-cat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sections-by-cat.component.html',
  styleUrl: './sections-by-cat.component.css'
})
export class SectionsByCatComponent {

  categories: any[] = [];

  constructor(private admincheckService: AdmincheckService) {}

  ngOnInit(): void {
    this.loadCategoriesWithSections();
  }

  loadCategoriesWithSections(): void {
    this.admincheckService.getCategoriesWithSections().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

}
