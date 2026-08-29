import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Shared/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private AuthService: AuthService,
    private router: Router,
  ) {}
  errorMessages: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  handleLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessages = '';

      this.AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response && response.length > 0) {
            const user = response[0];
            const token = `user-token-${user.id}`;

            localStorage.setItem('token', token);
            localStorage.setItem('eToken', token);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userId', user.id.toString());

            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessages = 'Invalid email or password. Please try again.';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessages = error?.error?.message || 'Login failed. Please try again.';
          console.error(error);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
