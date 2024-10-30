import { Component } from '@angular/core';
import { AccountsService } from '../../Services/accounts.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  emailUser: string = "";

  constructor(private _accountsService: AccountsService, private router: Router) { }



  sendEmailResetPassword() {
    Swal.fire({
      position: "center",
      icon: "info",
      title:"Informacion",
      text: "Si su correo esta registrado recibira instrucciones para reestablecer su contraseña.",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#0A135D",
    });
    
    if (this.emailUser === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Por favor ingrese un correo.",
        showConfirmButton: false,
        timer: 1600
      });
      return;
    }
    this._accountsService.requestResetPassword(this.emailUser).subscribe((tokenUser: any) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Por favor revise su correo para restablecer su contraseña.",
        showConfirmButton: false,
        timer: 1600
      });
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1700);
    })
  }
}



