// signup.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Credentials, UserInfo } from '../../Interfaces/credentials';
import { AccountsService } from '../../Services/accounts.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  name: string = "";
  dni: string = "";

  constructor(private _accountsService: AccountsService) { }


  ngOnInit(): void { }

  botonSignIn() {
    if (this.email === "" || this.password === "" || this.confirmPassword === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const user: UserInfo = {
      email: this.email,
      password: this.password,
      dni: this.dni,
      name: this.name,
      rol: "user"
    };

    this._accountsService.sigIn(user).subscribe(data => {

      console.log("El usuario fue registrado con exito");
    });
  }
}
