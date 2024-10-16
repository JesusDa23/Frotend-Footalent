import { Component } from '@angular/core';
import { UserInfo } from '../models/checklist.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AccountsService } from '../../Services/accounts.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-togglemenu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './togglemenu.component.html',
  styleUrl: './togglemenu.component.css'
})
export class TogglemenuComponent {

  constructor(
    private accountService: AccountsService,
    private router: Router,
  ) {}

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

  signOut(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de cerrar la sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#0A135D',   // Optional: Customize button colors
      cancelButtonColor: '#A22B2B'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the logout method from the AuthService if confirmed
        this.accountService.logout();
  
        // Optionally navigate to login or home page
        this.router.navigate(['/login']);  // Adjust the route as needed
  
        Swal.fire({
          title: 'Cerrado',
          text: 'Has cerrado la sesión correctamente.',
          icon: 'success',
          confirmButtonColor: '#0A135D'
        });
      } else {
        // Optional: Handle case when the user cancels
        Swal.fire({
          title: 'Cancelado',
          text: 'No se cerró la sesión.',
          icon: 'info',
          confirmButtonColor: '#0A135D'
        });
      }
    });
  }
  
}
