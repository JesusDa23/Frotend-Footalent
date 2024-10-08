import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Credentials, CreateDriver } from '../../../Interfaces/credentials';
import Swal from 'sweetalert2'
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { AccountsService } from '../../../Services/accounts.service';

@Component({
  selector: 'app-agregar-conductor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './agregar-conductor.component.html',
  styleUrl: './agregar-conductor.component.css'
})
export class AgregarConductorComponent {
  name: string = "";
  dni: string = "";
  email: string = "";
  phone: string = "";
  randomPassword: string = "";
  password: string = "12345";
  address: string = "";
  licencia: string = "";
  rol: string = "user";

  constructor(private _accountsService: AccountsService, http: HttpClient) { }
  private requestHeaders: HttpHeaders = new HttpHeaders();

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
    // verificacion de llenado de campos
    if (this.name === "" || this.dni === "" || this.email === "" || this.phone === "" || this.address === "" || this.licencia === "") {

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
      email: this.email,
      dni: this.dni,
      password: this.randomPassword,
      name: this.name,
      phone: this.phone,
      licencia: this.licencia,
      address: this.address,
      rol: this.rol
    };

    this._accountsService.signUp(newDriver).subscribe((res: any) => {

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
      }

    })
  }


  ngOnInit() {
    this.generatePassword()
  }

}