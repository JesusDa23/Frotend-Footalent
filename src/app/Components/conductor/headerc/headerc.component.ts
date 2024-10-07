import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserInfo } from '../../models/checklist.model';
import { TogglemenuComponent } from "../../togglemenu/togglemenu.component";


@Component({
  selector: 'app-headerc',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive, 
    NgClass, 
    TogglemenuComponent,
  ],
  
  templateUrl: './headerc.component.html',
  styleUrl: './headerc.component.css'
})
export class HeadercComponent {

  
  ngOnInit(){
    this.getUserInfo()
  }

  User = this.getUserInfo()
  menuVisible: boolean = false;


  private getUserInfo(): UserInfo | null {
    const userInfo = sessionStorage.getItem('userInfo');
    // console.log("que es esto:",userInfo)
    return userInfo ? JSON.parse(userInfo) : null;
  }


  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }



}
