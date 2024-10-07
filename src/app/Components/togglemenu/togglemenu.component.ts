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

    if (this.isMenuOpen) {
      // Add the no-scroll class to the body
      document.body.classList.remove('no-scroll');
    } else {
      // Remove the no-scroll class from the body
      
      document.body.classList.add('no-scroll');
    }
  }

  signOut() {
    this.accountService.logout(); // Call the logout method from the AuthService
  }


}
