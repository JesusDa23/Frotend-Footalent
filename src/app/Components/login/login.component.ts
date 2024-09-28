import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../Services/accounts.service';
import { Credentials, resLoginUser } from '../../Interfaces/credentials';
import { log } from 'node:console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  dni: string = ""
  password: string = ""

  constructor(private _accountsService: AccountsService, private router: Router) { }

  ngOnInit(): void {

  }

  botonLogIn() {
    console.log("DNI:", this.dni);
    console.log("Password:", this.password);

    if (this.dni == "" || this.password == "") {
      alert("Todos los campos son obligatorios")
    }

    let user: Credentials = {
      dni: this.dni,
      password: this.password
    }

    this._accountsService.logIn(user).subscribe((data) => {
      let dataCast = data as resLoginUser
      sessionStorage.setItem('token', dataCast.token);
      if(sessionStorage.getItem("token") != null){
        this.router.navigate(['/my-profile']);
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
