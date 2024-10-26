import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { Credentials, CreateDriver } from '../../../Interfaces/credentials';
import Swal from 'sweetalert2'
import { AccountsService } from '../../../Services/accounts.service';

import { SubheaderComponent } from '../../subheader/subheader.component';
import { TogglemenuComponent } from '../../togglemenu/togglemenu.component';
import { FooterComponent } from '../../footer/footer.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FooterDesktopComponent } from "../../footer-desktop/footer-desktop.component";



interface type_licence {
  value: string;
  viewValue: string;
}

interface rol {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-agregar-conductor',
  standalone: true,
  imports: [SubheaderComponent, TogglemenuComponent, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, FooterComponent, FooterDesktopComponent],
  templateUrl: './agregar-conductor.component.html',
  styleUrl: './agregar-conductor.component.css'
})
export class AgregarConductorComponent {
  dni: string = "";
  name: string = "";
  password: string = "";
  email: string = "";
  address: string = "";
  phone: string = "";
  licencia: string = "";
  rol: string = "user";
  licenceOptions: type_licence[] = [
    { value: 'comun', viewValue: 'Común' },
    { value: 'especial', viewValue: 'Especial' },
  ]
  userOptions:  rol[] = [
    {value: 'admin', viewValue: 'Administrador'},
    {value: 'user', viewValue: 'Conductor'}
  ]
  randomPassword: string = "";
  selectedLicence: string = "";
  selectedRol: string = "";
  expiration_licence: string = "";

  isLoading = false;

  constructor(
    private accountsService: AccountsService,
    private location: Location
  ) { }

  // creatar passwortd aleatorio 
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

  onSubmit() {
    // Verificación de llenado de campos
    if (
      this.name === "" || this.dni === "" || this.email === "" || 
      this.phone === "" || this.address === "" || this.licencia === "" || 
      this.selectedLicence === ""
    ) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Todos los campos son obligatorios.",
        showConfirmButton: false,
        timer: 1600
      });
      return;
    }
  
    // Verificación de validez de correo
    if (!/^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(this.email)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "El email no es valido.",
        showConfirmButton: false,
        timer: 1600
      });
      return;
    }
  
    this.randomPassword = this.generatePassword();
  
    const newDriver: CreateDriver = {
      dni: this.dni,
      name: this.name,
      phone: this.phone,
      email: this.email,
      address: this.address,
      password: this.randomPassword,
      licencia: this.licencia,
      rol: this.selectedRol,
      type_licence: this.selectedLicence,
      expiration_licence: this.expiration_licence,
    };
  
    this.isLoading = true; // Show loading indicator
  
    this.accountsService.signUp(newDriver).subscribe(
      (res: any) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "El usuario fue registrado con éxito.",
          showConfirmButton: false,
          timer: 1500
        });
        this.isLoading = false;
      },
      (error) => {
        // Display error message from the API
        const errorMessage = error.error?.message || "Hubo un error creando el usuario";
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        });
        console.error("Error creating user:", error);
        this.isLoading = false;
      }
    );
  }
  

  ngOnInit() {
    this.generatePassword()
  }

  goBack(): void {
    this.location.back();
  }

}
