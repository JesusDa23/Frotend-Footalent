import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../Services/accounts.service';
import { Credentials, resLoginUser } from '../../Interfaces/credentials';
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

  constructor(private _accountsService: AccountsService, private router: Router) {}

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
    
    const user: Credentials = {
      email: this.email,
      password: this.password
    };
  
    this._accountsService.logIn(user).subscribe({
      next: data => {
        const dataCast = data as resLoginUser;
        sessionStorage.setItem('token', dataCast.token);
        sessionStorage.setItem('userInfo', JSON.stringify(dataCast.user));
  
        this.isLoading = false; 
  
        if (sessionStorage.getItem("token") != null) {
          if (!dataCast.user.isFirstLogin) {
            this.navigateToRolePage(dataCast.user.rol);
          } else {
            this._accountsService.updateFirstLogin(dataCast.user.id, false).subscribe({
              next: updateData => {
                console.log("Estado de primer inicio actualizado", updateData);
                this.router.navigate(["/change-password"]);
              },
              error: updateError => {
                this.isLoading = false;
                console.error("Error al actualizar el estado del primer inicio de sesión", updateError);
              }
            });
          }
        }
      },
      error: err => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Error al iniciar sesión ${err?.error?.error ? `\n${err.error.error}` : ''}`,
          showConfirmButton: false,
          timer: 1600
        });
        this.isLoading = false;
        console.log("Error en el login", err);
      }
    });
  }
  
  private navigateToRolePage(rol: string) {
    if (rol === "admin") {
      this.router.navigate(['/home']);
    } else if (rol === "user") {
      this.router.navigate(['/homec']);
    }
  }
}
