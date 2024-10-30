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
    return result;
  }

  onSubmit() {
    // Verificación de campos obligatorios
    if (
      !this.name || !this.dni || !this.email || !this.phone || 
      !this.address || !this.licencia || !this.selectedLicence
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Faltan datos obligatorios",
        text: "Por favor completa todos los campos antes de enviar.",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#D33"
      });
      return;
    }
  
    // Verificación de formato de correo
    if (!/^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(this.email)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Correo no válido",
        text: "Ingresa un correo electrónico en formato válido.",
        showConfirmButton: true,
        confirmButtonColor: "#D33",
        confirmButtonText: "Aceptar"
      });
      return;
    }
  
    // Genera la contraseña si los datos son válidos
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
  
    // Muestra el indicador de carga
    this.isLoading = true;
  
    // Llama al servicio para crear el usuario
    this.accountsService.signUp(newDriver).subscribe({
      next: data => {
        if(data.result === "Unsuccessful"){
          console.log("ya existe");
        }
        this.isLoading = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registro exitoso",
          text: "El usuario fue registrado correctamente.",
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (error) => {
        this.isLoading = false;
        // Define un mensaje de error detallado
        const errorMessage = error.error?.message || "Ocurrió un error al crear el usuario. Por favor intenta nuevamente.";
  
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error en el registro",
          text: errorMessage,
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#D33"
        });
        console.error("Error al crear el usuario:", error);
      }
    });
  }
  
  

  ngOnInit() {
    this.generatePassword()
  }

  goBack(): void {
    this.location.back();
  }

}
