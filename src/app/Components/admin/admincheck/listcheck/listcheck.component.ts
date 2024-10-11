import { Component, HostListener } from '@angular/core';
import { Section } from '../../../models/section.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmincheckService } from '../../../../Services/admincheck.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bullet } from '../../../models/bullet.model';
import { TogglemenuComponent } from "../../../togglemenu/togglemenu.component";

@Component({
  selector: 'app-listcheck',
  standalone: true,
  imports: [CommonModule, FormsModule, TogglemenuComponent],
  templateUrl: './listcheck.component.html',
  styleUrl: './listcheck.component.css'
})
export class ListcheckComponent {
  isHidden = false;
  private lastScrollTop = 0;
  sections: Section[] = [];
  bullet: Bullet[] = [];
  categoryId: string | null = null;
  newSectionName: string = '';
  showNewSectionInput: boolean = false;  // Controls the visibility of the input field
  isEditing: boolean[] = [];
  errorMessage: string = '';
  expandedSections: boolean[] = [];


  toggleSection(index: number): void {
    this.expandedSections[index] = !this.expandedSections[index];
  }

  constructor(private route: ActivatedRoute, private admincheckService: AdmincheckService, private router: Router ) {}

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

  enableEditMode(index: number): void {
    this.isEditing[index] = true;
  }
  cancelEditMode(index: number): void {
    this.isEditing[index] = false;
  }

  addSection(): void {
    if (!this.newSectionName.trim()) {
      this.errorMessage = 'Section name cannot be empty';
      return;
    }

    const newSection: Section = {
      name: this.newSectionName,
      category: this.categoryId!, 
      bullets: this.bullet
    };

    this.admincheckService.createSection(newSection).subscribe(
      (section: Section) => {
        this.sections.push(section);  // Add new section to the list
        this.newSectionName = '';  // Clear input
        this.showNewSectionInput = false;  // Hide input field
        this.errorMessage = '';  // Clear any previous error
      },
      (error) => {
        this.errorMessage = 'Error adding section. Please try again later.';
      }
    );
  }

  updateSection(index: number): void {
    const updatedSection = this.sections[index];

    this.admincheckService.updateSection(updatedSection._id!, updatedSection).subscribe(
      (section: Section) => {
        console.log('Section updated:', section);
        this.isEditing[index] = false;  // Exit edit mode after saving
      },
      (error) => {
        this.errorMessage = 'Error updating section. Please try again later.';
        console.error('Error updating section:', error);
      }
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const bottomBar = document.getElementById('bottom-bar');
    const topBar = document.getElementById('top-bar');

    if (bottomBar) {
      if (currentScroll > this.lastScrollTop) {
        // Scrolling down
        bottomBar.classList.remove('translate-y-0');
        bottomBar.classList.add('translate-y-full');
        topBar!.classList.remove('translate-y-0');
        topBar!.classList.add('-translate-y-full');
      } else {
        // Scrolling up
        bottomBar.classList.remove('translate-y-full');
        bottomBar.classList.add('translate-y-0');
        topBar!.classList.remove('-translate-y-full');
        topBar!.classList.add('translate-y-0');
      }
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    }
  }
  onSectionClick(section: Section): void {
    this.router.navigate(['/sections',section._id]); 
  }
  
  goBack() {
    this.router.navigate(['/admincheck']); // Navigate back in history
  }

}
