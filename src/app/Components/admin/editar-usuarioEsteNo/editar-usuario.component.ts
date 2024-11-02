// import { Component, OnInit } from '@angular/core';
// import { Location } from '@angular/common';
// import { AccountsService } from '../../../Services/accounts.service';
// import { TogglemenuComponent } from '../../togglemenu/togglemenu.component';
// import { FooterDesktopComponent } from '../../footer-desktop/footer-desktop.component';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { NgForOf, NgFor, NgIf } from '@angular/common';
// import Swal from 'sweetalert2';
// import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'app-editar-usuario',
//   standalone: true,
//   imports: [TogglemenuComponent, FooterDesktopComponent, ReactiveFormsModule, NgForOf, NgIf],
//   templateUrl: './editar-usuario.component.html',
//   styleUrl: './editar-usuario.component.css'
// })
// export class EditarUsuarioComponent {
//   conductorForm: FormGroup;

//   userId: any = "";
//   name: string = "";
//   dni: string = "";
//   password: string = "";
//   email: string = "";
//   address: string = "";
//   phone: string = "";
//   licencia: string = "";
//   rol: string = "";
//   randomPassword: string = "";
//   type_licence: string = "";
//   expiration_licence: string = "";
//   isLoading = false;

//   user: any = {
//     user: "",
//     name: "",
//     dni: "",
//     password: "",
//     email: "",
//     address: "",
//     phone: "",
//     licencia: "",
//     rol: "",
//     type_licence: "",
//     expiration_licence: ""
//   }

//   userOptions = [
//     { value: 'admin', viewValue: 'Administrador' },
//     { value: 'user', viewValue: 'Conductor' }
//   ];

//   licenceOptions = [
//     { value: 'comun', viewValue: 'Común' },
//     { value: 'especial', viewValue: 'Especial' }
//   ];

//   constructor(private fb: FormBuilder,
//     private location: Location,
//     private route: ActivatedRoute,
//     private router: Router,
//     private accountsService: AccountsService

//   ) {


//     this.conductorForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(2)]],
//       dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,8}$')]], // 11 digitos DNI
//       phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]], // 10 a 12 digitos telefono
//       email: ['', [Validators.required, Validators.email]],
//       address: ['', Validators.required],
//       password: this.randomPassword,
//       selectedRol: ['', Validators.required],
//       licencia: ['', Validators.required],
//       selectedLicence: ['', Validators.required],
//       expiration_licence: ['', Validators.required]
//     });
//   }

//   generatePassword() {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let length = 5
//     let result = '';
//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * chars.length);
//       result += chars.charAt(randomIndex);
//     }
//     console.log(result);
//     return result;
//   }

//   onSubmit(): void {
//     if (this.conductorForm.valid) {
//       console.log('Form Data:', this.conductorForm.value);
//       this.randomPassword = this.generatePassword()

//       const name = this.conductorForm.value.name;
//       const dni = this.conductorForm.value.dni;
//       const phone = this.conductorForm.value.phone;
//       const email = this.conductorForm.value.email;
//       const address = this.conductorForm.value.address;
//       const selectedRol = this.conductorForm.value.selectedRol;
//       const licencia = this.conductorForm.value.licencia;
//       const selectedLicence = this.conductorForm.value.selectedLicence;
//       const expiration_licence = this.conductorForm.value.expiration_licence;


//       this.accountsService.signUp(this.conductorForm.value).subscribe((res: any) => {
//         this.isLoading = true;

//         if (res) {
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "El usuario fue registrado con éxito.",
//             showConfirmButton: false,
//             timer: 1500
//           });
//         } else {
//           Swal.fire({
//             position: "top-end",
//             icon: "error",
//             title: "Hubo un error creando el usuario",
//             showConfirmButton: false,
//             timer: 1500
//           });
//           console.log("no enviado");
//         }

//       })


//       // You can send the data to your backend here
//     } else {
//       console.log('Form is invalid');
//     }
//   }

//   get f() {
//     return this.conductorForm.controls;
//   }

//   getUserInfo() {
//     this.isLoading = true
//     this.userId = this.route.snapshot.paramMap.get('id');

//     this.accountsService.getUser(this.userId).subscribe((data: any) => {
//       if (data) {
//         this.isLoading = false

//         this.user = data
//         this.name = data.name
//         this.dni = data.dni,
//           this.name = data.name,
//           this.phone = data.phone,
//           this.email = data.email,
//           this.address = data.address,
//           this.rol = data.rol,
//           this.password = data.password,
//           this.licencia = data.licencia,
//           this.type_licence = data.type_licence,
//           this.expiration_licence = data.expiration_licence
//       }
//     })
//   }

//   goToHistory() {
//     const data = this.dni
//     this.router.navigate(['/historial-vehiculos', { state: data }])
//     console.log(data)
//   }

//   editUser() {
//     this.accountsService.updateUser(this.userId, this.user).subscribe((res: any) => {
//       Swal.fire('Actualizado!', 'El perfil ha sido actualizado.', 'success');

//     })
//   }

//   resetPassword() {
//     this.accountsService.requestResetPassword(this.email).subscribe((res: any) => {
//       if (res) {
//         Swal.fire('Restablecido!', 'El correo de restablecimiento ha sido enviado.', 'success');
//       } else {
//         Swal.fire('Error!', 'El correo de restablecimiento no ha sido enviado.', 'error');
//       }
//     })
//   }

//   ngOnInit() {
//     this.getUserInfo()
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         window.scrollTo(0, 0);
//       }
//     });
//   }

//   goBack(): void {
//     this.location.back();
//   }
// }

import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AccountsService } from '../../../Services/accounts.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgIf, NgClass, NgForOf } from '@angular/common';
import { SubheaderComponent } from '../../subheader/subheader.component';
import { TogglemenuComponent } from '../../togglemenu/togglemenu.component';
import { Location } from '@angular/common';
import { FooterDesktopComponent } from '../../footer-desktop/footer-desktop.component';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [NgIf, NgClass, NgForOf, SubheaderComponent, TogglemenuComponent, FooterDesktopComponent, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent {
  @ViewChild('sectionRef') sectionRef!: ElementRef;

  user: { status: boolean };
  userId: any = '';
  email: string = "";
  dni: string = "";
  pfp: string | ArrayBuffer | any = "default-profile-pic-url";
  isLoading = false;
  isDropdownOpen = false;
  userForm!: FormGroup;
  status: any = "";
  selectedFile: File | null = null;

  licenceOptions = [
    { value: 'comun', viewValue: 'Común' },
    { value: 'especial', viewValue: 'Especial' }
  ];

  userOptions = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'user', viewValue: 'Conductor' }
  ];

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
    this.user = { status: true };
  }

  ngOnInit() {
    this.getUserInfo();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  createForm() {
    this.userForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      dni: [{ value: '', disabled: true }, [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]], // 10 a 15 digitos telefono
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      address: ['', [Validators.required]],
      rol: ['', Validators.required],
      licencia: [{ value: '', disabled: true }, [Validators.required]],
      type_licence: ['', Validators.required],
      expiration_licence: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  pfpSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pfp = e.target.result; // Update the profile picture preview
      };
      reader.readAsDataURL(this.selectedFile); // Read the file as a data URL
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.accountsService.uploadProfilePicture(this.userId, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Imagen subida con éxito:', response);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al subir la imagen:', error);
        },
      });
    }
  }

  getUserInfo() {
    this.isLoading = true;
    this.userId = this.route.snapshot.paramMap.get('id');

    this.accountsService.getUser(this.userId).subscribe((data: any) => {
      if (data) {
        this.isLoading = false;
        this.userForm.patchValue(data);
        this.email = data.email;
        this.dni = data.dni;
        this.pfp = data.imageUrl;
        this.status = data.status;
      }
    });
  }

  editUser() {
    if (this.userForm.invalid) {
      Swal.fire({
        title: 'Todos los campos obligatorios deben ser completados',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0A135D',
      });
      return;
    }

    this.isLoading = true;

    this.accountsService.updateUser(this.userId, this.userForm.value).subscribe({
      next: () => {


        this.isLoading = false;
        Swal.fire({
          title: '¡Actualizado!',
          text: 'El perfil ha sido actualizado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0A135D',
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
          confirmButtonColor: '#D33',
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onStatusClick(isActive: boolean) {
    this.status = isActive;
    this.updateUserStatus(isActive);
    this.toggleDropdown();
  }

  updateUserStatus(isActive: boolean) {
    const statusUpdated = { status: isActive };
    this.accountsService.updateUser(this.userId, statusUpdated).subscribe(
      (res: any) => {
        if (res) {
          console.log(statusUpdated);
          Swal.fire({
            icon: 'success',
            title: 'El usuario ha sido actualizado.',
            confirmButtonColor: '#0A135D',
          }
          );
        } else {
          console.log("error");
        }
      }
    );
  }

  resetPassword() {
    Swal.fire({
      title: 'Estás a punto de cerrar la sesión.',
      text: 'Se te enviará una contraseña provisional a tu correo electrónico.',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0A135D',
      cancelButtonColor: '#F2F5FF'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountsService.requestResetPassword(this.email).subscribe((res: any) => {
          if (res) {
            Swal.fire('Restablecido!', 'El correo de restablecimiento ha sido enviado.', 'success');
          } else {
            Swal.fire('Error!', 'El correo de restablecimiento no ha sido enviado.', 'error');
          }
        })
      } else {
        Swal.fire({
          title: 'Cancelado',
          text: 'No se cerró la sesión.',
          icon: 'info',
          confirmButtonColor: '#0A135D'
        });
      }
    })


  }

  goToHistory() {
    const data = this.dni
    this.router.navigate(['/historial-vehiculos', { state: data }])
  }

}

