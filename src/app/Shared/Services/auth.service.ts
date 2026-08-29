import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { createClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Users } from '../interface/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl : string;

  constructor(private http: HttpClient , private Router:Router) { this.baseUrl =  environment.apiUrl}
  saveUserData() {
    if (localStorage.getItem('eToken') != null) {
      let encodeTokan: any = localStorage.getItem('eToken');

    }
  }

  AddUser(userData: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userData);
  }

  login(userData:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/users?email=eq.${userData.email}&password=eq.${userData.password}&select=*`
    );
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('eToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');

    this.Router.navigate(['/login']);
  }
  getUser():Observable<any>{
        return this.http.get(`${this.baseUrl}/users`);
  }
getUserById(id: number) {
  return this.http.get<Users[]>(
    `${this.baseUrl}/users?id=eq.${id}`
  );
}



}
