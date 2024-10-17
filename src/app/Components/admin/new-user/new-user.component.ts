import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AccountsService } from '../../../Services/accounts.service';
import { TogglemenuComponent } from '../../togglemenu/togglemenu.component';
import { FooterDesktopComponent } from '../../footer-desktop/footer-desktop.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForOf, NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2'


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

  isLoading = false;

  constructor(private fb: FormBuilder,
    private accountsService: AccountsService
  ) {

    
    this.conductorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      dni: ['', [Validators.required,  Validators.pattern('^[0-9]{11}$')]], // 11 digitos DNI
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]], // 10 a 12 digitos telefono
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      password: this.randomPassword,
      selectedRol: ['', Validators.required],
      licencia: ['', Validators.required],
      selectedLicence: ['', Validators.required],
      expiration_licence: ['', Validators.required]
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
    console.log(result);
    return result;
  }

    onSubmit(): void {
    if (this.conductorForm.valid) {
      console.log('Form Data:', this.conductorForm.value);
      this.randomPassword = this.generatePassword()

      this.accountsService.signUp(this.conductorForm.value).subscribe((res: any) => {
        this.isLoading = true; 
        
        if (res) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "El usuario fue registrado con éxito.",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Hubo un error creando el usuario",
            showConfirmButton: false,
            timer: 1500
          });
          console.log("no enviado");
        }
  
      })


      // You can send the data to your backend here
    } else {
      console.log('Form is invalid');
    }
  }

  // Navigation back
  goBack(): void {
    // Implement navigation logic here
  }

   get f() {
    return this.conductorForm.controls;
  }
}