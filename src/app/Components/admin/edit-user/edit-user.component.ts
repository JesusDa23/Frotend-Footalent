import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { AccountsService } from '../../../Services/accounts.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
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


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [SubheaderComponent, TogglemenuComponent, FormsModule, RouterLink, FooterDesktopComponent, NgIf],
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
    expiration_licence: ""
  }

  licenceOptions: type_licence[] = [
    { value: 'comun', viewValue: 'Común' },
    { value: 'especial', viewValue: 'Especial' },
  ]

  userOptions: rol[] = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'user', viewValue: 'Conductor' },
  ]

  // *******************

  selectedDni: any = "";

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
    this.accountsService.updateUser(this.userId, this.user).subscribe((res: any) => {
      Swal.fire('Actualizado!', 'El perfil ha sido actualizado.', 'success');

    })
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
    this.getUserInfo()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
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


}
