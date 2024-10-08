import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TogglemenuComponent } from "../togglemenu/togglemenu.component";


@Component({
  selector: 'app-subheader',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TogglemenuComponent],
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.css'
})
export class SubheaderComponent {

  menuVisible: boolean = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  
  }


}
