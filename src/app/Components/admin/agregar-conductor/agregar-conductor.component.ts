import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { Credentials, CreateDriver } from '../../../Interfaces/credentials';
import Swal from 'sweetalert2'
import { AccountsService } from '../../../Services/accounts.service';

import { SubheaderComponent } from '../../subheader/subheader.component';
import { TogglemenuComponent } from '../../togglemenu/togglemenu.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

interface type_licence {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-agregar-conductor',
  standalone: true,
  imports: [SubheaderComponent, TogglemenuComponent, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
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
  randomPassword: string = "";
  selectedLicence: string = "";
  expiration_licence: string = "";

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
    // verificacion de llenado de campos
    if (this.name === "" || this.dni === "" || this.email === "" || this.phone === "" || this.address === "" || this.licencia === "" || this.selectedLicence === "") {

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Todos los campos son obligatorios.",
        showConfirmButton: false,
        timer: 1600
      });
      return;
    }
    // verificacion de validez de correo
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

    this.randomPassword = this.generatePassword()

    const newDriver: CreateDriver = {
      dni: this.dni,
      name: this.name,
      phone: this.phone,
      email: this.email,
      address: this.address,
      password: this.randomPassword,
      licencia: this.licencia,
      type_licence: this.selectedLicence,
      expiration_licence: this.expiration_licence,
      rol: this.rol
    };

    console.log(newDriver);

    this.accountsService.signUp(newDriver).subscribe((res: any) => {

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
  }



  ngOnInit() {
    this.generatePassword()



  }
  goBack(): void {
    this.location.back();
  }

}
