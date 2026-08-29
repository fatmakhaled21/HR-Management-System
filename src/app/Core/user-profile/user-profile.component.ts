import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Shared/Services/auth.service';
import { DatePipe, NgIf, NgForOf, NgFor, CommonModule } from '@angular/common';
import { Users } from '../../Shared/interface/users';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  constructor(
    private authservice: AuthService,
    private toastr: ToastrService,
  ) {}

  user: Users | null = null;
  openAddUserPopup: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  addUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),

    role: new FormControl('user', Validators.required),

    status: new FormControl('active', Validators.required),
  });

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.authservice.getUserById(Number(userId)).subscribe({
        next: (data: Users[]) => {
          this.user = data[0];
      
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
  openAddUser() {
    this.openAddUserPopup = true;
  }
  closeAddUser() {
    this.openAddUserPopup = false;
  }
  addUser() {
    this.isLoading = true;

    this.authservice.AddUser(this.addUserForm.value).subscribe({
      next: (response: any) => {
        this.addUserForm.reset();
        this.openAddUserPopup = false;
        this.toastr.success('Employee added successfully', 'Success');
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }
}
