import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

import { AccountsService } from '../../../Services/accounts.service';
import { inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conductores',
  standalone: true,
  imports: [HeaderComponent, CdkDropList, CdkDrag],
  templateUrl: './conductores.component.html',
  styleUrl: './conductores.component.css'
})
export class ConductoresComponent {

  accountService = inject(AccountsService)
  retrievedUsers: any[] = [];
  httpClient = inject(HttpClient)

  constructor(private http: HttpClient) { }
  private requestHeaders: HttpHeaders = new HttpHeaders(); 


  retrieveUsers() {
    this.accountService.retrieveUsers().subscribe((res: any) => {
      if (res) {
        this.retrievedUsers = res.data
        console.log("Funcionó");
        console.log(this.retrievedUsers);
      } else {
        console.log("No se obtuvieron usuarios");
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.retrievedUsers, event.previousIndex, event.currentIndex);
  }


  ngOnInit() {
    this.retrieveUsers();
  }

}
