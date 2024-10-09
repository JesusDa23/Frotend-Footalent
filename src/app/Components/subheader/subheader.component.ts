import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TogglemenuComponent } from "../togglemenu/togglemenu.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-subheader',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TogglemenuComponent],
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.css'
})
export class SubheaderComponent {
  @Input() pageTitle: string = '';

  constructor(private location: Location) { }

  backClicked() {
    this.location.back();
  }

  menuVisible: boolean = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }


}
