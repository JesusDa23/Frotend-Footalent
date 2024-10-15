import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TogglemenuComponent } from "../../togglemenu/togglemenu.component";
import { UserInfo } from '../../models/checklist.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TogglemenuComponent, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

   
  ngOnInit(){
    this.getUserInfo()
  }

  User = this.getUserInfo()
  menuVisible: boolean = false;


  private getUserInfo(): UserInfo | null {
    const userInfo = sessionStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }


  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  
  }



}
