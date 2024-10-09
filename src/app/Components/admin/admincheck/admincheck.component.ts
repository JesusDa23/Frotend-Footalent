import { Component } from '@angular/core';
import { Category } from '../../models/category.model';
import { AdmincheckService } from '../../../Services/admincheck.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Section } from '../../models/section.model';
import { Router } from '@angular/router';
import { AccountsService } from '../../../Services/accounts.service';

@Component({
  selector: 'app-admincheck',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admincheck.component.html',
  styleUrl: './admincheck.component.css'
})
export class AdmincheckComponent {

  sections: Section[] = [];
  selectedCategoryId: string | null = null;
  selectedCategory: Category | null = null;

  showActions = false;
  categories: Category[] = [];
  categoryName: string = '';
  editedCategory: Category | null = null ;  // To store the category being edited
  isEditing: boolean = false; 

  constructor(private admincheckService: AdmincheckService, private router: Router, private location: Location, private  accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accountsService.isAdmin()
    // Load categories when component is initialized
    this.admincheckService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  createCategory(): void {
    if (this.categoryName.trim() !== '') {
      const category: Category = { name: this.categoryName };

      this.admincheckService.createCategory(category).subscribe(
        (category: Category) => {
          console.log('Category created:', category);
          this.categories.push(category);        // Add ccategory to the list
          this.categoryName = '';             // Clear the input field
        },
        (error) => {
          console.error('Error creating category:', error);
        }
      );
    } else {
      console.warn('Category name cannot be empty');
    }
  }

  editCategory(category: Category): void {
    this.isEditing = true;
    this.editedCategory = { ...category } ;  // Copy category for editing
  }

  updateCategory(): void {
    if (this.editedCategory && this.categoryName.trim() !== '') {
      this.editedCategory.name = this.categoryName;  // Update the category's name

      this.admincheckService.updateCategory(this.editedCategory._id!, this.editedCategory).subscribe(
        (updatedCategory: Category) => {
          const index = this.categories.findIndex(c => c._id === updatedCategory._id);
          if (index !== -1) {
            this.categories[index] = updatedCategory;
          }
          this.cancelEdit();  // Reset edit state
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    } else {
      console.warn('Category name cannot be empty');
    }
  }

  deleteCategory(id: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.admincheckService.deleteCategory(id).subscribe(
        () => {
          this.categories = this.categories.filter(c => c._id !== id);
        },
        (error) => {
          console.error('Error deleting category:', error);
        }
      );
    }
  }

  // Cancel edit mode
  cancelEdit(): void {
    this.isEditing = false;
    this.editedCategory = null;
    this.categoryName = '';
  }

  toggleButtons() {
    this.showActions = !this.showActions;
  }

  loadSections(categoryId: string): void {
    this.selectedCategoryId = categoryId;
    this.admincheckService.getSectionsByCategory(categoryId).subscribe(
      (sections) => {
        this.sections = sections;
      },
      (error) => {
        console.error('Error fetching sections:', error);
      }
    );
  }
  

  onCategoryClick(category: Category): void {
    this.router.navigate(['/listcheck', category._id]); 
  }

  goBack(): void {
    this.location.back();
  }

}
