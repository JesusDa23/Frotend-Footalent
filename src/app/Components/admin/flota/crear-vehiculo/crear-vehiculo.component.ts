import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdmincheckService } from '../../../../Services/admincheck.service';
import { FlotaService } from '../../../../Services/flota.service';
import { NgClass, UpperCasePipe } from '@angular/common';
import { Location } from '@angular/common';
import { log } from 'console';
import { AccountsService } from '../../../../Services/accounts.service';

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

  status: any;
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

  cargarcategorias(){
    
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

  guardarVehiculo(): void {

    const vin = this.generateVIN();
    console.log("VIN generado:", vin);
    console.log("status:", this.TipoId);
    console.log("marca:", this.make);
    console.log("placa:", this.plate);
    console.log("arrayvehiculo",this.arrayVehiculo)
    console.log("modelo:", this.model);

    const vehiculo: any = {
      category: this.TipoId,
      make : this.make,
      plate : this.plate,
      model: this.model,
      mileage : this.mileage,
      year: this.year,
      vin: vin
    }
    

    this._flotaService.createNewFlota(vehiculo).subscribe({
      next: (response) => {
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
