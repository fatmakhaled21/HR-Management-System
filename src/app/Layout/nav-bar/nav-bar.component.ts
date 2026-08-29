import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Shared/Services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive,NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(private authService: AuthService, private router:Router){}
 openpopu: boolean = false;


  LogOutUser(): void {
    this.openpopu = true;

  }
  CencleLogout() {
    this.openpopu = false;
  }

  conformLogout() {
    this.openpopu = true;
     this.authService.logOut();

 localStorage.removeItem('token');

 this.openpopu = false;

 this.router.navigate(['/login']);

  }
}
