import { Component, Input } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { Credentials, CreateDriver } from '../../../Interfaces/credentials';
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
  user: any = "";
  name: string = "";
  dni: string = "";
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
  type_licence: string = "";
  expiration_licence: string = "";

  // *******************

  selectedDni: any = "";

  constructor(
    private accountsService: AccountsService,
    private location: Location,
    private route: ActivatedRoute,

  ) {  }

  getUserInfo() {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.accountsService.getUser(this.userId).subscribe((res: any) => {
      if (res) {
        this.user = res
        this.name = res.name
        this.dni = res.dni,
        this.name = res.name,
        this.phone = res.phone,
        this.email = res.email,
        this.address = res.address,
        this.password = res.password,
        this.licencia = res.licencia,
        this.type_licence = res.type_licence,
        this.expiration_licence = res.expiration_licence,
        console.log(this.password);
      } else {
        console.log("Not retrieved");
      }
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

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   this.userId = params.get('id') ?? '';
    // });

    this.getUserInfo()
  }

}
