// signup.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Credentials, UserInfo } from '../../Interfaces/credentials';
import { AccountsService } from '../../Services/accounts.service';
import { Router } from '@angular/router';

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

  constructor(private _accountsService: AccountsService, private router: Router) { }


  ngOnInit(): void { }

  botonSignUp() {
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

    this._accountsService.signUp(user).subscribe({
      next: data => {
        console.log("El usuario fue registrado con éxito");
        console.log("data", data);

        this.router.navigate(['/login']);
      },
      error: err => {
        console.error("Error al registrar el usuario:", err);
        alert("Hubo un error al registrar el usuario. Inténtalo de nuevo.");
      }
    });
  }
}
