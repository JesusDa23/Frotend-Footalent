import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../Services/accounts.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  newPassword: string = "";
  oldPassword: string = "";
  confirmPassword: string = "";
  changeForEmail: boolean = false;
  tokenUserEmail: string = "";
  userId: any;

  constructor(private _accountsService: AccountsService, private router: Router) { }

  ngOnInit() {
    if (this.router.url.includes('change-password-for-email')) {
      this.changeForEmail = true;
      this.tokenUserEmail = this.router.url.split('/')[2];
    }
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Las contraseñas no coinciden.",
        showConfirmButton: false,
        timer: 1600
      });
      return;
    }
    if (!this.changeForEmail) {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo')!);
      this.userId = userInfo.dni;
      this.handleChangePassword()
    } else {
      this.userId = jwtDecode(this.tokenUserEmail);
      this.userId = this.userId.email;
      this._accountsService.findDataUser(this.userId).subscribe({
        next: (data) => {
          console.log('data:', data)
          this.userId = data.dataUser.dni;
          this.handleChangePassword()
        },
        error: (err) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `Error al obtener el usuario\n${err.error}`,
            showConfirmButton: false,
            // timer: 1600
          });
        }
      })
    }
  }

  handleChangePassword() {
    this._accountsService.updatePassword(this.userId, this.newPassword, this.oldPassword, this.changeForEmail).subscribe({
      next: () => {
        console.log('--------------', this.userId)
        this._accountsService.updateFirstLogin(this.userId, false).subscribe({
          next: () => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Contraseña actualizada exitosamente.",
              showConfirmButton: false,
              timer: 1600
            });
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1700);
          },
          error: (err) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `Error al actualizar el estado de primer inicio\n${err.error}`,
              showConfirmButton: false,
              timer: 1600
            });
          }
        });

      },
      error: (err) => {
        console.log(err);

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Error al cambiar la contraseña\n${err.error.error}`,
          showConfirmButton: false,
          // timer: 1600
        });
      }
    });
  }


}
