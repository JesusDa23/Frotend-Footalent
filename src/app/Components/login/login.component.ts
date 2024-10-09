import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../Services/accounts.service';
import { Credentials, resLoginUser } from '../../Interfaces/credentials';
import { log } from 'node:console';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email: string = ""
  password: string = ""

  constructor(private _accountsService: AccountsService, private router: Router) { }

  ngOnInit(): void {
    this._accountsService.isLogedIn()
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
    }
    this._accountsService.logIn(user).subscribe({
      next: data => {
        // console.log("data", data);

        let dataCast = data as resLoginUser;
        sessionStorage.setItem('token', dataCast.token);

        // Store user information in sessionStorage
        sessionStorage.setItem('userInfo', JSON.stringify(dataCast.user));

        console.log("DATA CONSOLA: ", dataCast.user.rol);


        if(sessionStorage.getItem("token") != null){

          if(dataCast.user.rol == "admin"){
            this.router.navigate(['/home']);
          }
          else if(dataCast.user.rol == "user"){
            this.router.navigate(['/homec']);
          }

        }
      },
      error: err => {
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

  // ToDo: Si quieren implementar el login por medio de cookies, deben de armar la cookie desde el backend para enviarla al frontend y guardarla
  // Para realizar esto, se debe de usar una libreria de node llamada cookie-parser, esta es la encargada de armar la cookie con la siguiente estructura
  // res.cookie('cookieName', 'cookieValue', { maxAge: 900000, httpOnly: true });
  // ? cookieName: es el nombre de la cookie
  // ? cookieValue: es el valor de la cookie
  // ? {} : es un objeto que contiene las opciones o configuraciones de la cookie


}
