import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-auth-blank',
  standalone: true,
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './auth-blank.component.html',
  styleUrl: './auth-blank.component.scss'
})
export class AuthBlankComponent {

}
