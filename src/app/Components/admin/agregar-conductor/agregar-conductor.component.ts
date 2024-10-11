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

interface TipoLicencia {
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
  name: string = "";
  dni: string = "";
  email: string = "";
  phone: string = "";
  randomPassword: string = "";
  password: string = "12345";
  address: string = "";
  licencia: string = "";
  selectedLicence: string = "";
  vencimiento: string ="";


  rol: string = "user";
  tiposLicencia: TipoLicencia[] = [
    { value: 'comun', viewValue: 'Común' },
    { value: 'especial', viewValue: 'Especial' },
  ]

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
      tipoLicencia: this.selectedLicence,
      address: this.address,
      vencimiento: this.vencimiento,
      rol: this.rol,
      isFirstLogin: true
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
