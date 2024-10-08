import { Component } from '@angular/core';
import { HeadercComponent } from "../headerc/headerc.component";
import { FlotaComponent } from "../../admin/flota/flota.component";
import { HomeinsComponent } from "../homeins/homeins.component";

@Component({
  selector: 'app-homec',
  standalone: true,
  imports: [HeadercComponent, FlotaComponent, HomeinsComponent],
  templateUrl: './homec.component.html',
  styleUrl: './home.component.css'
})
export class HomecComponent {

}
