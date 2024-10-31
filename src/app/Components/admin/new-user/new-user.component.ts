import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AccountsService } from '../../../Services/accounts.service';
import { TogglemenuComponent } from '../../togglemenu/togglemenu.component';
import { FooterDesktopComponent } from '../../footer-desktop/footer-desktop.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForOf, NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2'
import { error } from 'console';


@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [TogglemenuComponent, FooterDesktopComponent, ReactiveFormsModule, NgForOf, NgFor, NgIf],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  conductorForm: FormGroup;
  randomPassword: string = "";

  userOptions = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'user', viewValue: 'Conductor' }
  ];

  licenceOptions = [
    { value: 'comun', viewValue: 'Común' },
    { value: 'especial', viewValue: 'Especial' }
  ];

  isLoading = true;

  constructor(private fb: FormBuilder,
    private accountsService: AccountsService,
    private location: Location
  ) {


    this.conductorForm = this.fb.group({
      dni: ['', [Validators.required,
        // Validators.pattern('^[0-9]{11}$')
      ]], // 7-8 digitos DNI
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,
        // Validators.pattern('^[0-9]{10,12}$')
      ]], // 10 a 12 digitos telefono
      address: ['', Validators.required],
      password: this.randomPassword,
      licencia: ['', Validators.required],
      type_licence: ['', Validators.required],
      expiration_licence: ['', Validators.required],
      rol: ['', Validators.required],

    });
  }

  generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let length = 5
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars.charAt(randomIndex);
    }
    return result;
  }

  onSubmit(): void {
    if (this.conductorForm.valid) {
      console.log('Form Data:', this.conductorForm.value);
      this.randomPassword = this.generatePassword()

      this.conductorForm.patchValue({
        password: this.randomPassword
      });

      this.accountsService.signUp(this.conductorForm.value).subscribe(


        (res: any) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "El usuario fue registrado con éxito.",
            showConfirmButton: false,
            timer: 1600
          });
        },
        (error: any) => {

          if (error.error.error === 'Correo ya en uso') {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: 'El correo ya está en uso',
              showConfirmButton: false,
              timer: 1600
            });
          } else if (error.error.error === 'DNI ya en uso') {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: 'El DNI ya está en uso',
              showConfirmButton: false,
              timer: 1600
            });
          } else if (error.error.error === 'Teléfono ya en uso') {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: 'El teléfono ya está en uso',
              showConfirmButton: false,
              timer: 1600
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error creando el usuario',
              timer: 1600
            });
          }
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  goBack(): void {
    this.location.back();
  }

  get f() {
    return this.conductorForm.controls;
  }

  ngOnInit() {
    this.isLoading = false;

  }
}
