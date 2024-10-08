import { Injectable, NgZone } from '@angular/core';
import { AccountsService } from './accounts.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InactivityServiceService {

  private timeoutId: any;
  private readonly inactivityTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor(private authService: AccountsService, private router: Router, private ngZone: NgZone) {
    this.startInactivityTimer();
    this.addActivityListeners();
  }

  private startInactivityTimer() {
    this.ngZone.runOutsideAngular(() => {
      this.timeoutId = setTimeout(() => {
        this.authService.logout(); // Call logout on inactivity
      }, this.inactivityTimeout);
    });
  }

  private resetInactivityTimer() {
    clearTimeout(this.timeoutId); // Clear the existing timeout
    this.startInactivityTimer(); // Restart the timer
  }

  private addActivityListeners() {
    document.addEventListener('mousemove', () => this.resetInactivityTimer());
    document.addEventListener('keydown', () => this.resetInactivityTimer());
    document.addEventListener('click', () => this.resetInactivityTimer());
    document.addEventListener('scroll', () => this.resetInactivityTimer());
  }

  
}
