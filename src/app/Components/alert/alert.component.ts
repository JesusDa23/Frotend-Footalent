import { Component } from '@angular/core';
import { Alert, AlertService } from '../../Services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  alert: Alert | null = null;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alertState.subscribe((alert) => {
      this.alert = alert;
      if (alert.message) {
        setTimeout(() => this.alert = null, 5000); // Auto-clear after 5 seconds
      }
    });
  }

}
