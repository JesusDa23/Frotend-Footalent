import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AccountsService } from '../../Services/accounts.service';
import { Credentials, resLoginUser } from '../../Interfaces/credentials';
import { log } from 'node:console';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2'
import { NgClass, NgIf } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { FooterDesktopComponent } from "../footer-desktop/footer-desktop.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, NgClass, FooterComponent, FooterDesktopComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email: string = ""
  password: string = ""
  showPassword = false;
  isLoading = false;

  constructor(private _accountsService: AccountsService, private router: Router) { }

  ngOnInit(): void {
    this._accountsService.isLogedIn()
  }


  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
    this.isLoading = true;
    let user: Credentials = {
      email: this.email,
      password: this.password
    }
    this._accountsService.logIn(user).subscribe({
      next: data => {
      
        let dataCast = data as resLoginUser;
        sessionStorage.setItem('token', dataCast.token);
        // Store user information in sessionStorage
        sessionStorage.setItem('userInfo', JSON.stringify(dataCast.user));
        this.isLoading = false; 
        if(sessionStorage.getItem("token") != null){
          this._accountsService.updateFirstLogin(dataCast.user.id, false).subscribe(
            {next: data=> {
              console.log("actualizado", data);
              if(!dataCast.user.isFirstLogin){
                if(dataCast.user.rol == "admin"){
                  this.router.navigate(['/home']);
                }
                else if(dataCast.user.rol == "user"){
                  this.router.navigate(['/homec']);
                }
              }
              else{
                this.router.navigate(["/change-password"])
              }
            },
          error: data=>
          {
            this.isLoading = false;
            console.error("error al actualizar el estado del primer inicio de sesion", data);
          }
          })


        }
      },
      error: err => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Error al iniciar sesión\n${err.error.error}`,
          showConfirmButton: false,
          timer: 1600
        });
        console.log("data", err);
        this.isLoading = false; 
      }
    });

  }
}
