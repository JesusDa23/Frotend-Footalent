import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Category } from '../Components/models/category.model';
import { Section } from '../Components/models/section.model';
import { Bullet } from '../Components/models/bullet.model';

@Injectable({
  providedIn: 'root'
})
export class AdmincheckService {

  private apiUrl = `${environment.apiUrl}/checklist`; // Adjust to your backend URL

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // 1. Method to create a category
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories`, category, { headers: this.headers });
  }

  // 2. Method to get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/getCategories`);
  }

  // 3. Method to create a section
  createSection(section: Section): Observable<Section> {
    return this.http.post<Section>(`${this.apiUrl}/sections`, section, { headers: this.headers });
  }

  // 4. Method to get sections by category
  getSectionsByCategory(categoryId: string): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.apiUrl}/sections/category/${categoryId}`);
  }

  // 5. Method to create a bullet
  createBullet(bullet: { description: string; requerido: boolean; sectionId: string }): Observable<Bullet> {
    return this.http.post<Bullet>(`${this.apiUrl}/bullets`, bullet);
  }

  // 6. Method to get bullets by section
  getBulletsBySection(sectionId: string): Observable<Bullet[]> {
    return this.http.get<Bullet[]>(`${this.apiUrl}/sections/${sectionId}/bullets`);
  }
    // Update an existing bullet
  updateBullet(bulletId: string, description: string): Observable<Bullet> {
    return this.http.patch<Bullet>(`${this.apiUrl}/bullets/${bulletId}`, { description });
  }

    // Delete a bullet
  deleteBullet(bulletId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bullets/${bulletId}`);
  }


    // Update a category by ID
  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/categories/${id}`, category, { headers: this.headers });
  }

  // Delete a category by ID
  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }

  updateSection(sectionId: string, section: Section): Observable<Section> {
    return this.http.put<Section>(`${this.apiUrl}/sections/${sectionId}`, section, { headers: this.headers });
  }

  addBullet(sectionId: string, bullet: { description: string }): Observable<Section> {
    const url = `${this.apiUrl}/sections/${sectionId}/bullets`;
    return this.http.post<Section>(url, bullet);
  }

  updateRequerido(bulletId: string, requerido: boolean): Observable<Bullet> {
    return this.http.patch<Bullet>(`${this.apiUrl}/bullets/${bulletId}/requerido`, { requerido });
  }

}
