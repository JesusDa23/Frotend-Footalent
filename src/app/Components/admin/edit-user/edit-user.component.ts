import { Component, Input } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { AccountsService } from '../../../Services/accounts.service';
import { ActivatedRoute } from '@angular/router';

import { SubheaderComponent } from '../../subheader/subheader.component';
import { TogglemenuComponent } from '../../togglemenu/togglemenu.component';
import { Location } from '@angular/common';

interface type_licence {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [SubheaderComponent, TogglemenuComponent, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  userId: any = "";
  // user: any = "";
  name: string = "";
  dni: string = "";
  password: string = "";
  email: string = "";
  address: string = "";
  phone: string = "";
  licencia: string = "";
  rol: string = "user";
  randomPassword: string = "";
  type_licence: string = "";
  expiration_licence: string = "";

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

  // *******************

  selectedDni: any = "";

  constructor(
    private accountsService: AccountsService,
    private location: Location,
    private route: ActivatedRoute,

  ) { }

  getUserInfo() {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.accountsService.getUser(this.userId).subscribe((data: any) => {
      if (data) {
        this.user = data
        this.name = data.name
        this.dni = data.dni,
          this.name = data.name,
          this.phone = data.phone,
          this.email = data.email,
          this.address = data.address,
          this.password = data.password,
          this.licencia = data.licencia,
          this.type_licence = data.type_licence,
          this.expiration_licence = data.expiration_licence
      } 
    })
  }


  editUser() {
    console.log(this.user);
    this.accountsService.updateUser(this.userId, this.user).subscribe((res: any) => {
    })
  }

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

  resetPassword(){
    this.generatePassword()
  }


  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getUserInfo()
  }

}
