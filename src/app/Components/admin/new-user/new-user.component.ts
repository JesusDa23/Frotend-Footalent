import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AccountsService } from '../../../Services/accounts.service';
import { TogglemenuComponent } from '../../togglemenu/togglemenu.component';
import { FooterDesktopComponent } from '../../footer-desktop/footer-desktop.component';
@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [TogglemenuComponent, FooterDesktopComponent],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {


  constructor(
    private accountsService: AccountsService,
    private location: Location
  ) { }




  goBack(): void {
    this.location.back();
  }
}
