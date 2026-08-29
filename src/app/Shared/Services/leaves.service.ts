import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  private baseUrl : string;

    constructor(private http: HttpClient) { this.baseUrl =  environment.apiUrl}

    getLeaves(): Observable<any> {
      return this.http.get(`${this.baseUrl}/leaves?select=*,employees(name)`);
    }
     getLeavesById(id:number): Observable<any>{
    return this.http.get(`${this.baseUrl}/employees?id=eq.${id}&select=*,departments(id,name)`)
  }
   addLeave(data: any) {
  return this.http.post(`${this.baseUrl}/leaves`,data);
}


}
