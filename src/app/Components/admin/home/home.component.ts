import { Component, Inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FlotaComponent } from '../flota/flota.component';
import { AccountsService } from '../../../Services/accounts.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FlotaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    this.accountsService.isAdmin();
  }
}