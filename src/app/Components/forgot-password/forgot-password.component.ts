import { Component } from '@angular/core';
import { AccountsService } from '../../Services/accounts.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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
    if (this.emailUser === "") {
      Swal.fire({
        position: "top-end",
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


/**
 Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Se ha enviado un correo para restablecer tu contraseña.",
          showConfirmButton: false,
        });
 */
