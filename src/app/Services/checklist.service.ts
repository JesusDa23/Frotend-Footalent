import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Checklist } from '../Components/models/checklist.model'; // Assuming you have a Checklist model
import { environment } from '../../environments/environment'; // Adjust the path if needed
import { ChecklistData } from '../Components/models/checklist.model';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  private apiUrl = `${environment.apiUrl}/checklist`; // Define your API base URL in environment

  constructor(private http: HttpClient) { }

  // Method to get all checklists
  getChecklists(): Observable<Checklist[]> {
    return this.http.get<Checklist[]>(this.apiUrl);
  }

  // Method to get a single checklist by ID
  getChecklistById(id: string): Observable<Checklist> {
    return this.http.get<Checklist>(`${this.apiUrl}/${id}`);
  }

  // Method to create a new checklist
  createChecklist(checklist: Checklist): Observable<Checklist> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Checklist>(this.apiUrl, checklist, { headers });
  }

  // Method to update an existing checklist
  updateChecklist(id: string, checklist: Checklist): Observable<Checklist> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Checklist>(`${this.apiUrl}/${id}`, checklist, { headers });
  }

  // Method to delete a checklist
  deleteChecklist(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private checklistData: any = {};

  setChecklistData(section: string, data: any) {
    this.checklistData[section] = data;
  }

  getChecklistData(): Observable<ChecklistData>{
    return this.checklistData;
  }

  clearChecklistData() {
    this.checklistData = {};
  }

}
