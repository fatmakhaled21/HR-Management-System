import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getDepartments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/departments`);
  }
  getDepartmentsForDropdown(): Observable<any> {
    return this.http.get(`${this.baseUrl}/departments?select=id,name`);
  }
  addDepartments(departmentsdata:object): Observable<any>{
    return this.http.post(`${this.baseUrl}/departments`,departmentsdata)
  }
}
