import { Component, ElementRef, HostListener } from '@angular/core';
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

  sections: Section[] = [];
  sectionName: string = ''; 
  isAdding: boolean = false; 
  isEditing: boolean = false; 
  editedSection: Section | null = null; 
  isModalOpen: { [key: string]: boolean } = {}; 
  categoryId: string | null = null; // To store the current category ID from params
  lastScrollTop: number = 0;

  isLoading = false;

  constructor(
    private admincheckService: AdmincheckService, 
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    // Get the categoryId from the route parameters
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId']; 
      this.loadSections();
    });
  }

  // Load sections based on the current category
  loadSections(): void {
    if (this.categoryId) {
      this.isLoading = true; // Start loading
    
      this.admincheckService.getSectionsByCategory(this.categoryId).subscribe(
        data => {
          this.sections = data;
          this.isLoading = false; // Stop loading after data is retrieved
        },
        error => {
          console.error('Error retrieving sections:', error);
          this.isLoading = false; // Stop loading if an error occurs
        }
      );
    }
  }

  // Create new section and link it to the current category
  createSection(): void {
    if (this.sectionName.trim() !== '' && this.categoryId) {
      const section: Section = { 
        name: this.sectionName, 
        category: this.categoryId // Link section to current category
      };

      this.admincheckService.createSection(section).subscribe(
        (newSection: Section) => {
          this.sections.push(newSection);
          this.sectionName = '';  
          this.isAdding = false;  
        },
        (error) => {
          console.error('Error creating section:', error);
        }
      );
    }
  }



  // Update section after editing
  updateSection(): void {
    if (this.editedSection && this.sectionName.trim() !== '') {
      this.editedSection.name = this.sectionName;

      this.admincheckService.updateSection(this.editedSection._id!, this.editedSection).subscribe(
        (updatedSection: Section) => {
          const index = this.sections.findIndex(s => s._id === updatedSection._id);
          if (index !== -1) {
            this.sections[index] = updatedSection;
          }
          this.cancelEdit(event); 
        },
        (error) => {
          console.error('Error updating section:', error);
        }
      );
    }
  }

  // Delete a section
  deleteSection(id: string): void {
    if (confirm('Are you sure you want to delete this section?')) {
      this.admincheckService.deleteSection(id).subscribe(
        () => {
          this.sections = this.sections.filter(s => s._id !== id);
        },
        (error) => {
          console.error('Error deleting section:', error);
        }
      );
    }
  }


  toggleModal(sectionId: string, event: Event): void {
    event.stopPropagation();  // Prevent propagation to parent click
    this.isModalOpen[sectionId] = !this.isModalOpen[sectionId];  // Toggle the modal visibility
  }
  
  
  editSection(section: Section, event: Event): void {
    event.stopPropagation();  // Prevent triggering the parent click event
  
    if (section._id) {
      this.isEditing = true;
      this.editedSection = { ...section };  // Copy the section for editing
      this.sectionName = section.name;  // Pre-fill the input with the current name
      this.isModalOpen[section._id] = false;  // Close the modal after starting to edit
    }
  }
  
  cancelEdit(event?: Event): void {
    if (event) {
      event.stopPropagation(); 
    }  // Stop the event propagation
    this.isEditing = false;
    this.editedSection = null;
    this.sectionName = '';  // Reset input
  }
  
  // Enable add new mode
  enableAddNew(): void {
    this.isAdding = true;
    this.sectionName = '';
  }

  // Cancel adding new section
  cancelAddNew(): void {
    this.isAdding = false;
    this.sectionName = '';
  }

  // Close modals
  closeAllModals(): void {
    Object.keys(this.isModalOpen).forEach(key => {
      this.isModalOpen[key] = false;
    });
  }




  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const bottomBar = document.getElementById('bottom-bar');

    if (bottomBar) {
      if (currentScroll > this.lastScrollTop) {
        // Scrolling down
        bottomBar.classList.remove('translate-y-0');
        bottomBar.classList.add('translate-y-full');
      } else {
        // Scrolling up
        bottomBar.classList.remove('translate-y-full');
        bottomBar.classList.add('translate-y-0');
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
