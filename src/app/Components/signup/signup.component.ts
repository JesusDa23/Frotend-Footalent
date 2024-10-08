// signup.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Credentials, UserInfo } from '../../Interfaces/credentials';
import { AccountsService } from '../../Services/accounts.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  name: string = "";
  dni: string = "";
  phone: string = "";
  termsAccepted: boolean = false;

  constructor(private _accountsService: AccountsService, private router: Router) { }


  ngOnInit(): void { }

  botonSignUp() {


    // Validar si los campos estan vacios
    if (this.email === "" || this.password === "" || this.confirmPassword === "") {

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Todos los campos son obligatorios.",
        showConfirmButton: false,
        timer: 1600
      });
      return;
    }

    // Validar si las claves son iguales
    if (this.password !== this.confirmPassword) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Las contraseñas no coinciden.",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    // Validar si el email es correcto
    if (!/^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(this.email)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "El email no es valido.",
        showConfirmButton: false,
        timer: 1600
      });
      return;
    }

    if (!this.termsAccepted) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Debes aceptar los términos y condiciones.",
        showConfirmButton: false,
        timer: 1600
      });
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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "El usuario fue registrado con éxito.",
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1700);
      },
      error: err => {
        console.error("Error al registrar el usuario:", err.error);

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Hubo un error al registrar el usuario. Inténtalo de nuevo.\n \nDetalle de error: ${err.error.error}`,
          showConfirmButton: false,
          timer: 1600
        });

      }
    });
  }
}
