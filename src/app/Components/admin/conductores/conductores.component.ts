import { Component, HostListener, NgModule } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CdkDropList, CdkDrag, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AccountsService } from '../../../Services/accounts.service';
import { inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterDesktopComponent } from '../../footer-desktop/footer-desktop.component';
import { AgregarConductorComponent } from '../agregar-conductor/agregar-conductor.component';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { EditarUsuarioComponent } from '../editar-usuarioEsteNo/editar-usuario.component';

@Component({
  selector: 'app-conductores',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule, AgregarConductorComponent, CdkDropList, CdkDrag, RouterLink, NgIf, EditarUsuarioComponent, FooterDesktopComponent],
  templateUrl: './conductores.component.html',
  styleUrl: './conductores.component.css'
})
export class ConductoresComponent {

  accountsService = inject(AccountsService)
  retrievedUsers: any[] = [];
  httpClient = inject(HttpClient)
  isLoading = false;
  pfp: string = "default-profile-pic-url"

  private lastScrollTop = 0;

  searchTerm: string = '';
  filteredForms: any[] = [];  

  constructor(private http: HttpClient, private dniService: AccountsService) { }

  selectedDni: string | null = null;

  selectDriver(dni: string) {
    this.dniService.changeDni(dni);
  }

  retrieveUsers() {
    this.isLoading = true
    this.accountsService.retrieveUsers().subscribe((res: any) => {
      if (res) {
        this.retrievedUsers = res.data
        this.pfp = res.data.imageUrl;
        this.filteredForms = [...this.retrievedUsers];  
        this.isLoading = false
      } else {
        Swal.fire('Error!', 'Hubo un error obteniendo la lista de conductores.', 'error');
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.retrievedUsers, event.previousIndex, event.currentIndex);
  }


  ngOnInit() {
    this.retrieveUsers();
    this.accountsService.isAdmin();
    this.retrievedUsers
    console.log(this.pfp);
  }

  searchForms() {
    const term = this.searchTerm.toLowerCase().trim();
    if (term) {
      this.filteredForms = this.retrievedUsers.filter( user  =>
        user.name?.toLowerCase().includes(term) ||
        user.dni?.toLowerCase().includes(term) ||
        user.phone?.toLowerCase().includes(term) 
      );
    } else {
      // Resetear a todos los formularios si no se proporciona un término de búsqueda
      this.filteredForms = [...this.retrievedUsers];
    }
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

}
