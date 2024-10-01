import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FlotaComponent } from '../flota/flota.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FlotaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
