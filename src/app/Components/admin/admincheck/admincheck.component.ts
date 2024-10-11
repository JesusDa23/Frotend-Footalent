import { Component } from '@angular/core';
import { Category } from '../../models/category.model';
import { AdmincheckService } from '../../../Services/admincheck.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Section } from '../../models/section.model';
import { Router } from '@angular/router';
import { AccountsService } from '../../../Services/accounts.service';
import { TogglemenuComponent } from "../../togglemenu/togglemenu.component";

@Component({
  selector: 'app-admincheck',
  standalone: true,
  imports: [FormsModule, CommonModule, TogglemenuComponent],
  templateUrl: './admincheck.component.html',
  styleUrl: './admincheck.component.css'
})
export class AdmincheckComponent {


  isModalOpen: { [key: string]: boolean } = {};
  selectedCategoryId: string | null = null;
  selectedCategory: Category | null = null;
  categories: any[] = [];
  categoryName: string = '';
  editedCategory: Category | null = null;  // To store the category being edited
  isEditing: boolean = false;
  isAdding: boolean = false;
  

  constructor(
    private admincheckService: AdmincheckService, 
    private router: Router, 
    private location: Location, 
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.accountsService.isAdmin();
    // Load categories when component is initialized
    this.admincheckService.getCategories().subscribe(data => {
      this.categories = data.map(category => ({
        ...category,
        showActions: false  // Initialize showActions for each category
      }));
    });
  }

  // Create a new category
  createCategory(): void {
    if (this.categoryName.trim() !== '') {
      const category: Category = { name: this.categoryName };

      this.admincheckService.createCategory(category).subscribe(
        (newCategory: Category) => {
          console.log('Category created:', newCategory);
          this.categories.push({
            ...newCategory,
            showActions: false  // Add showActions property to the new category
          });
          this.categoryName = '';  // Clear the input field
          this.isAdding = false;  // Exit Add New mode
        },
        (error) => {
          console.error('Error creating category:', error);
        }
      );
    } else {
      console.warn('Category name cannot be empty');
    }
  }

  // Edit an existing category
  editCategory(category: Category): void {
    this.isEditing = true;
    this.editedCategory = { ...category };  // Copy category for editing
    this.categoryName = category.name;  // Pre-fill the input with the current name
  }

  // Update a category after editing
  updateCategory(): void {
    if (this.editedCategory && this.categoryName.trim() !== '') {
      this.editedCategory.name = this.categoryName;  // Update the category's name

      this.admincheckService.updateCategory(this.editedCategory._id!, this.editedCategory).subscribe(
        (updatedCategory: Category) => {
          const index = this.categories.findIndex(c => c._id === updatedCategory._id);
          if (index !== -1) {
            this.categories[index] = { ...updatedCategory, showActions: false };
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

  // Delete a category
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

  // Enable "Add New" mode
  enableAddNew(): void {
    this.isAdding = true;
    this.isEditing = false;
    this.categoryName = '';
  }

  // Cancel "Add New" mode
  cancelAddNew(): void {
    this.isAdding = false;
    this.categoryName = '';
  }

  // Cancel edit mode
  cancelEdit(): void {
    this.isEditing = false;
    this.editedCategory = null;
    this.categoryName = '';
  }

  toggleModal(categoryId: string): void {
    this.isModalOpen[categoryId] = !this.isModalOpen[categoryId];
  }

  // Toggle the actions (edit/delete) visibility for the clicked category
  toggleActions(category: any): void {
    category.showActions = !category.showActions;  // Toggle the showActions property for the selected category
  }

  // Handle category click (navigate to the corresponding category's sections)
  onCategoryClick(category: Category): void {
    this.router.navigate(['/listcheck', category._id]); 
  }

  // Go back to the previous page
  goBack(): void {
    this.location.back();
  }

}
