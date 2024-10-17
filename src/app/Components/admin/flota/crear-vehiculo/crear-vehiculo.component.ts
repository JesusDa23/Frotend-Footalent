import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdmincheckService } from '../../../../Services/admincheck.service';
import { FlotaService } from '../../../../Services/flota.service';
import { NgClass, UpperCasePipe } from '@angular/common';
import { Location } from '@angular/common';
import { log } from 'console';
import { AccountsService } from '../../../../Services/accounts.service';
import Swal from 'sweetalert2';
import { SubheaderComponent } from '../../../subheader/subheader.component';



@Component({
  selector: 'app-crear-vehiculo',
  standalone: true,
  imports: [SubheaderComponent, FormsModule, UpperCasePipe, NgClass, RouterLink],
  templateUrl: './crear-vehiculo.component.html',
  styleUrl: './crear-vehiculo.component.css'
})
export class CrearVehiculoComponent {
  constructor(private accountsService: AccountsService, private location: Location, private _categorias: AdmincheckService, private _flotaService: FlotaService) { }
  arrayVehiculo: any = []

  status: string = "";


  make: any;
  plate: any;
  category: any;
  model: any;
  mileage: any;
  year: any;
  TipoId: string = "";



  onClose(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.cargarcategorias()
    this.accountsService.isAdmin();

  }

  cargarcategorias() {

    this._categorias.getCategories().subscribe(
      (data: any) => {
        this.arrayVehiculo = data;
      },
      (error) => {
        console.error("Error al obtener categorías:", error);
      }
    );
  }

  generateVIN(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Letras y números
    let vin = '';
    for (let i = 0; i < 17; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      vin += characters[randomIndex];
    }
    return vin;
  }

  preventNegative(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === 'e') {
      event.preventDefault();
    }
  }

  limitNumberLength(event: Event, maxLength: number, field: 'year' | 'mileage'): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }

    // Asigna el valor al campo correcto
    if (field === 'year') {
      this.year = Number(input.value);
    } else if (field === 'mileage') {
      this.mileage = Number(input.value);
    }
  }



  guardarVehiculo(): void {

    const placaRegex = /^[A-Za-z]{3}[0-9]{3}$/;
    const vin = this.generateVIN();
    console.log("VIN generado:", vin);
    console.log("status:", this.TipoId);
    console.log("marca:", this.make);
    console.log("placa:", this.plate);
    console.log("arrayvehiculo", this.arrayVehiculo)
    console.log("modelo:", this.model);
    console.log("year:", this.year);

    const vehiculo: any = {
      category: this.TipoId,
      make: this.make,
      plate: this.plate,
      model: this.model,
      mileage: this.mileage,
      year: this.year,
      vin: vin
    }

    if (
      !this.TipoId || !this.make || !this.plate || !this.model ||
      !this.mileage || !this.year || !this.status
    ) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Todos los campos son obligatorios.",
        showConfirmButton: false,
        timer: 1600
      });
      return;
    }

    if (this.year < 1886 || this.year > 2025) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "El año de fabricación debe ser entre los años 1886 y 2025.",
        showConfirmButton: false,
        timer: 1600
      });
      return;
    }

    if (!placaRegex.test(this.plate)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "La placa debe tener 3 letras seguidas de 3 números.",
        showConfirmButton: false,
        timer: 1600
      });
      return;
    }

    this._flotaService.createNewFlota(vehiculo).subscribe({
      next: (response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Flota creada exitosamente.",
          showConfirmButton: false,
          timer: 1600
        });
        console.log("Flota creada exitosamente:", response);
        // Aquí puedes manejar la respuesta, como mostrar un mensaje al usuario
      },
      error: (err) => {
        console.error("Error al crear la flota:", err);
        // Manejo de errores
      }
    });


  }


}
