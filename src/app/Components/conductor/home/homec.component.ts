import { Component } from '@angular/core';
import { HeadercComponent } from "../headerc/headerc.component";
import { FlotaComponent } from "../../admin/flota/flota.component";
import { HomeinsComponent } from "../homeins/homeins.component";
import { FooterDesktopComponent } from "../../footer-desktop/footer-desktop.component";

@Component({
  selector: 'app-homec',
  standalone: true,
  imports: [HeadercComponent, FlotaComponent, HomeinsComponent, FooterDesktopComponent],
  templateUrl: './homec.component.html',
  styleUrl: './home.component.css'
})
export class HomecComponent {

}
