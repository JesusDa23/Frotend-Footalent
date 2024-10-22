import { Component } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../../../Services/accounts.service';
import { FlotaService } from '../../../../Services/flota.service';
import { FooterDesktopComponent } from '../../../footer-desktop/footer-desktop.component';

@Component({
  selector: 'app-historial-conductores',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FooterDesktopComponent, FormsModule],
  templateUrl: './historial-conductores.component.html',
  styleUrl: './historial-conductores.component.css'
})
export class HistorialConductoresComponent {
  vehicle: any;
  vehicleId: any = '';
  isLoading = false;

  constructor(private location: Location, private accountsService: AccountsService, private flotaService: FlotaService, private route: ActivatedRoute) {}
  
  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.isLoading = true;
    this.accountsService.isAdmin();

    this.vehicleId = this.route.snapshot.paramMap.get('vehicleId');
  }
}

