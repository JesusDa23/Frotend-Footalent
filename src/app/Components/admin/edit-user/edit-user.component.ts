import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { AccountsService } from '../../../Services/accounts.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgIf, NgClass, NgForOf } from '@angular/common';
import { SubheaderComponent } from '../../subheader/subheader.component';
import { TogglemenuComponent } from '../../togglemenu/togglemenu.component';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { FooterDesktopComponent } from '../../footer-desktop/footer-desktop.component';


interface type_licence {
  value: string;
  viewValue: string;
}

interface rol {
  value: string;
  viewValue: string;
}
interface status {
  value: boolean;
  viewValue: string;
}


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [NgClass, NgForOf, SubheaderComponent, TogglemenuComponent, FormsModule, RouterLink, FooterDesktopComponent, NgIf],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  @ViewChild('sectionRef') sectionRef!: ElementRef;
  private lastScrollTop = 0;
  userId: any = "";
  name: string = "";
  dni: string = "";
  password: string = "";
  email: string = "";
  address: string = "";
  phone: string = "";
  licencia: string = "";
  rol: string = "";
  randomPassword: string = "";
  type_licence: string = "";
  expiration_licence: string = "";
  status: any = "";
  selectedDni: any = "";

  isDropdownOpen = false;
  isLoading = false;

  user: any = {
    user: "",
    name: "",
    dni: "",
    password: "",
    email: "",
    address: "",
    phone: "",
    licencia: "",
    rol: "",
    type_licence: "",
    expiration_licence: "",
    status: ""
  }

  statusOptions: status[] = [
    { value: true, viewValue: "Activo" },
    { value: false, viewValue: "Inhabilitado" }

  ]

  licenceOptions: type_licence[] = [
    { value: 'comun', viewValue: 'Común' },
    { value: 'especial', viewValue: 'Especial' },
  ]

  userOptions: rol[] = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'user', viewValue: 'Conductor' },
  ]

  // *******************


  constructor(
    private accountsService: AccountsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  getUserInfo() {
    this.isLoading = true
    this.userId = this.route.snapshot.paramMap.get('id');

    this.accountsService.getUser(this.userId).subscribe((data: any) => {
      if (data) {
        this.isLoading = false
        this.user = data
        this.name = data.name
        this.dni = data.dni,
        this.name = data.name,
        this.phone = data.phone,
        this.email = data.email,
        this.address = data.address,
        this.rol = data.rol,
        this.password = data.password,
        this.licencia = data.licencia,
        this.type_licence = data.type_licence,
        this.status = data.status,
        this.expiration_licence = data.expiration_licence
      }
    })
  }

  goToHistory() {
    const data = this.dni
    this.router.navigate(['/historial-vehiculos', { state: data }])
    console.log(data)
  }

  editUser() {
    // Validate all required fields
    if (!this.user.name || !this.user.dni || !this.user.phone || !this.user.email || !this.user.rol || 
        !this.user.address || !this.user.licencia || !this.user.type_licence || !this.user.expiration_licence) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos antes de guardar.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#D33'
      });
      return;
    }
  
    // Indica que la actualización está en proceso
    this.isLoading = true;
  
    // Llama al servicio para actualizar el usuario
    this.accountsService.updateUser(this.userId, this.user).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        Swal.fire({
          title: '¡Actualizado!',
          text: 'El perfil ha sido actualizado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0A135D'
        });
      },
      error: (error) => {
        this.isLoading = false;
        const errorMessage = error.error?.message || 'Ocurrió un error al actualizar el perfil. Por favor intenta nuevamente.';
        Swal.fire({
          title: 'Error al actualizar',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#D33'
        });
        console.error('Error al actualizar el usuario:', error);
      }
    });
  }
  

  onStatusClick(status: boolean) {
    this.accountsService.updateUser(this.userId, this.statusOptions).subscribe((res: any) => {
      if (res) {
      } else {
      }
    })
    // ({
    //   next: () => {
    //     console.log('User status updated successfully');
    //     this.status = status; // Update local status if needed
    //     this.isDropdownOpen = false; // Close dropdown after selection
    //   },
    //   error: (err) => {
    //     console.error('Error updating user status:', err);
    //   },
    // });
  }

  resetPassword() {
    this.accountsService.requestResetPassword(this.email).subscribe((res: any) => {
      if (res) {
        Swal.fire('Restablecido!', 'El correo de restablecimiento ha sido enviado.', 'success');
      } else {
        Swal.fire('Error!', 'El correo de restablecimiento no ha sido enviado.', 'error');
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    console.log(this.statusOptions);
    this.getUserInfo()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }


  

  onlyLetters(event: KeyboardEvent) {
    const pattern = /[a-zA-Z]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
  
  onlyLettersAndNumbers(event: KeyboardEvent) {
    const pattern = /[a-zA-Z0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
  
  onlyLettersNumbersAndDash(event: KeyboardEvent) {
    const pattern = /[a-zA-Z0-9-]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
  
  onlyNumbers(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (this.sectionRef) {
      const sectionElement = this.sectionRef.nativeElement;

      if (currentScroll > this.lastScrollTop) {
        // Scrolling down - hide the section
        sectionElement.classList.add('translate-y-full');
        sectionElement.classList.remove('translate-y-0');
      } else {
        // Scrolling up - show the section
        sectionElement.classList.add('translate-y-0');
        sectionElement.classList.remove('translate-y-full');
      }

      // Update the last scroll position
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown visibility
  }



}
