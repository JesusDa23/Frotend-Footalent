import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdmincheckService } from '../../../Services/admincheck.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../../models/section.model';
import { Bullet } from '../../models/bullet.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sections-by-cat',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sections-by-cat.component.html',
  styleUrl: './sections-by-cat.component.css'
})
export class SectionsByCatComponent {

  categories: any[] = [];
  categoryId: string | null = null;
  sections: Section[] = [];
  selectedBullets: Bullet[] = [];
  openSectionId: string | null = null;
  bulletsForm!: FormGroup;

  constructor(
    private admincheckService: AdmincheckService , 
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (this.categoryId) {
      this.loadSections();
    }
    this.bulletsForm = this.fb.group({});
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

  onSectionClick(sectionId: string): void {
    const section = this.sections.find(s => s._id === sectionId);
    if (section) {
      if (this.openSectionId === sectionId) {
        this.openSectionId = null; // Close section
      } else {
        this.openSectionId = sectionId; // Open section
      }

      // Fetch bullets if not already loaded
      if (!section.bullets || section.bullets.length === 0) {
        this.admincheckService.getBulletsBySection(sectionId).subscribe(
          (bullets: Bullet[]) => {
            section.bullets = bullets;

            // Add a form control for each bullet
            bullets.forEach(bullet => {
              this.bulletsForm.addControl(
                `bullet_${bullet._id}`,
                this.fb.control(false)
              );
            });
          },
          (error) => {
            console.error('Failed to load bullets', error);
          }
        );
      }
    }
  }
  
  


  // Method to check if the section is open
  isSectionOpen(sectionId: string): boolean {
    return this.openSectionId === sectionId;
  }

  onSubmit(): void {
    console.log(this.bulletsForm.value);
    // Handle form submission logic here
  }
  

}
