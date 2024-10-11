import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../Services/accounts.service';
import { Credentials, resLoginUser } from '../../Interfaces/credentials';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corregir a styleUrls en plural
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private _accountsService: AccountsService, private router: Router) { }

  ngOnInit(): void {
    this._accountsService.isLogedIn();
  }

  botonLogIn() {
    if (this.email == "" || this.password == "") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Todos los campos son obligatorios.",
        showConfirmButton: false,
        timer: 1600
      });
      return;
    }

    let user: Credentials = {
      email: this.email,
      password: this.password
    };

    this._accountsService.logIn(user).subscribe({
      next: (data) => {
        let dataCast = data as resLoginUser;
        sessionStorage.setItem('token', dataCast.token);

        // Guardar la información del usuario en sessionStorage
        sessionStorage.setItem('userInfo', JSON.stringify(dataCast.user));


        if (sessionStorage.getItem("token") != null) {
          console.log("Este es el resultado:", dataCast.user);

          // Verifica si es la primera vez que el usuario inicia sesión
          if (dataCast.user.isFirstLogin) {
            // Redirigir a la página de cambio de contraseña si es la primera vez
            this.router.navigate(['/change-password']);
          }

          else {
            // Redirigir según el rol del usuario
            if (dataCast.user.rol === "admin") {
              this.router.navigate(['/home']);
            } else if (dataCast.user.rol === "user") {
              this.router.navigate(['/homec']);
            }
          }
        }
      },
      error: (err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Error al iniciar sesión\n${err.error.error}`,
          showConfirmButton: false,
          timer: 1600
        });
        console.log("data", err);
      }
    });
  }
}
