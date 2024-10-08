import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Components/login/login.component";
import { SwPush } from '@angular/service-worker';
import { PushService } from './Services/push.service';
import { initFlowbite } from 'flowbite';
import { InactivityServiceService } from './Services/inactivity-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent implements OnInit {
  title = 'FooTalent';
  public readonly VAPID_PUBLIC_KEY = 'BAeWX7N_MJx-3QNtLbU55xXxlda9AVTjqcLGhbC6eoUU9GZFqVxzjyNusIME9k_2OWp4IXbYMnlJlxzD0r5shlw';

  constructor(
    private swPush: SwPush, 
    private pushservice: PushService,
    private inactivityService: InactivityServiceService
  ) {
    // this.subscribeToNotifications();
  }

  ngOnInit(): void {
    initFlowbite();
  }

  // subscribeToNotifications(): void {
  //   this.swPush.requestSubscription({
  //     serverPublicKey: this.VAPID_PUBLIC_KEY  
  //   }).then(sub => {
  //     const token = JSON.parse(JSON.stringify(sub));

  //   }).catch(err => {
  //     console.error('Could not subscribe to notifications', err);
  //   });
  // }
  
}
