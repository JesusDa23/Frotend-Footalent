import { Component, Input } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { Credentials, CreateDriver } from '../../../Interfaces/credentials';
import Swal from 'sweetalert2'
import { AccountsService } from '../../../Services/accounts.service';
import { ActivatedRoute } from '@angular/router';

import { SubheaderComponent } from '../../subheader/subheader.component';
import { TogglemenuComponent } from '../../togglemenu/togglemenu.component';
import { Location } from '@angular/common';

interface TipoLicencia {
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

  // *******************

  selectedDni: any = "";

  constructor(
    private accountsService: AccountsService,
    private location: Location,
    private route: ActivatedRoute,

  ) {
    this.accountsService.currentDni$.subscribe(dni => {
      this.selectedDni = dni; // Update the local variable when the service emits a new value
      console.log('Child received DNI:', this.selectedDni); // Log for debugging
    });
  }

  getUserInfo() {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.accountsService.getUser(this.userId).subscribe ((res: any) => {
      if(res){
        this.user = res
        this.name = res.name
        console.log(this.user, this.name);
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

    console.log("this is", this.selectedDni);

    this.getUserInfo()
  }

}
