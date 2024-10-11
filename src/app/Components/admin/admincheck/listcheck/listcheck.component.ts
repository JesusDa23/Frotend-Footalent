import { Component, HostListener } from '@angular/core';
// import { Section } from '../../../models/section.model';
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

  sections: any[] = [];  // List of sections
  sectionName: string = '';  // Bound to the input field
  isAdding: boolean = false; // To track if a new section is being added
  isEditing: boolean = false; // To track if a section is being edited
  editedSection: any | null = null; // Stores the section being edited
  isModalOpen: { [key: string]: boolean } = {}; // To track modal open state for each section

  constructor(private admincheckService: AdmincheckService, private location: Location ) {}

  ngOnInit(): void {
    // this.loadSections();
  }

  // Load sections when component is initialized
  // loadSections(): void {
  //   this.admincheckService.getSections().subscribe(data => {
  //     this.sections = data;
  //   });
  // }

  // Create new section
  // createSection(): void {
  //   if (this.sectionName.trim() !== '') {
  //     const section: Section = { name: this.sectionName };

  //     this.admincheckService.createSection(section).subscribe(
  //       (newSection: Section) => {
  //         this.sections.push(newSection);
  //         this.sectionName = '';  // Clear input field
  //         this.isAdding = false;  // Exit adding mode
  //       },
  //       (error) => {
  //         console.error('Error creating section:', error);
  //       }
  //     );
  //   }
  // }

  // Edit an existing section
  // editSection(section: Section): void {
  //   this.isEditing = true;
  //   this.editedSection = { ...section }; // Copy section for editing
  //   this.sectionName = section.name;
  // }

  // Update section after editing
  // updateSection(): void {
  //   if (this.editedSection && this.sectionName.trim() !== '') {
  //     this.editedSection.name = this.sectionName;

  //     this.admincheckService.updateSection(this.editedSection._id!, this.editedSection).subscribe(
  //       (updatedSection: Section) => {
  //         const index = this.sections.findIndex(s => s._id === updatedSection._id);
  //         if (index !== -1) {
  //           this.sections[index] = updatedSection;
  //         }
  //         this.cancelEdit(); // Exit editing mode
  //       },
  //       (error) => {
  //         console.error('Error updating section:', error);
  //       }
  //     );
  //   }
  // }

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

  // Toggle modal for smaller screens
  toggleModal(sectionId: string): void {
    this.isModalOpen[sectionId] = !this.isModalOpen[sectionId];
  }

  // Cancel editing mode
  cancelEdit(): void {
    this.isEditing = false;
    this.editedSection = null;
    this.sectionName = '';
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














  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   this.debounce(() => {
  //     const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  //     const bottomBar = document.getElementById('bottom-bar');
  //     const topBar = document.getElementById('top-bar');
  
  //     if (bottomBar && topBar) {
  //       if (currentScroll > this.lastScrollTop) {
  //         // Scrolling down
  //         bottomBar.classList.add('translate-y-full');
  //         bottomBar.classList.remove('translate-y-0');
  //         topBar.classList.add('-translate-y-full');
  //         topBar.classList.remove('translate-y-0');
  //       } else {
  //         // Scrolling up
  //         bottomBar.classList.remove('translate-y-full');
  //         bottomBar.classList.add('translate-y-0');
  //         topBar.classList.remove('-translate-y-full');
  //         topBar.classList.add('translate-y-0');
  //       }
  //     }
  
  //     this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  //   }, 200)(); // Adding 200ms delay to reduce updates.
  // }
  // onSectionClick(section: Section): void {
  //   this.router.navigate(['/sections',section._id]); 
  // }
  
  // goBack() {
  //   this.router.navigate(['/admincheck']); // Navigate back in history
  // }

}
