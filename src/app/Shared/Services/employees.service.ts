import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private baseUrl : string;

  constructor(private http: HttpClient) { this.baseUrl =  environment.apiUrl}

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees?select=*,departments(*)`);
  }

  addEmployees(employeedata:object): Observable<any>{
    return this.http.post(`${this.baseUrl}/employees`,employeedata)
  }
    deleteEmployeeById(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/employees?id=eq.${id}`)
  }
  getEmployeeById(id:number): Observable<any>{
    return this.http.get(`${this.baseUrl}/employees?id=eq.${id}&select=*,departments(id,name)`)
  }
   EditemployeesById(id: number, data: any): Observable<any> {
  return this.http.patch(`${this.baseUrl}/employees?id=eq.${id}`,data);
}


}
