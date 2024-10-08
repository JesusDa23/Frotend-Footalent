import { Component } from '@angular/core';
import { UserInfo } from '../models/checklist.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountsService } from '../../Services/accounts.service';


@Component({
  selector: 'app-togglemenu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './togglemenu.component.html',
  styleUrl: './togglemenu.component.css'
})
export class TogglemenuComponent {

  constructor(private accountService: AccountsService) {}

  ngOnInit(){
    this.getUserInfo()
  }

  User = this.getUserInfo()
  isMenuOpen = false; 

  private getUserInfo(): UserInfo | null {
    const userInfo = sessionStorage.getItem('userInfo');
    // console.log("que es esto:",userInfo)
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
