import { Component } from '@angular/core';
import { UserInfo } from '../models/checklist.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountsService } from '../../Services/accounts.service';



@Component({
  selector: 'app-togglemenu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './togglemenu.component.html',
  styleUrl: './togglemenu.component.css'
})
export class TogglemenuComponent {

  constructor(private accountService: AccountsService) {}

  isMenuOpen = false; 
  isAdmin = false;  // Define if the user is admin or not
  user: UserInfo | null = null;

  ngOnInit() {
    this.user = this.getUserInfo();
    this.isAdmin = this.user?.rol === 'admin'; // Assuming the role field is 'admin' or 'user'
  }

  private getUserInfo(): UserInfo | null {
    const userInfo = sessionStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  // Method to toggle the menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    // Get the element by its id
    const menuElement = document.getElementById('menu');
    
    if (menuElement) {
      // Toggle the 'hidden' class based on menuVisible
      if (this.isMenuOpen) {
        menuElement.classList.remove('hidden');
      } else {
        menuElement.classList.add('hidden');
      }
    }
  }

  signOut() {
    this.accountService.logout(); // Call the logout method from the AuthService
  }
}
