import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './Layout/dashboard/dashboard.component';
import { EmployeesComponent } from './Core/Employes/employees/employees.component';
import { DepartmentsComponent } from './Core/departments/departments.component';
import { NavBarComponent } from './Layout/nav-bar/nav-bar.component';
import { SettingsComponent } from './Core/settings/settings.component';
import { AttendanceComponent } from './Core/attendance/attendance.component';
import { UserProfileComponent } from './Core/user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './Auth/not-found/not-found.component';
import { AuthBlankComponent } from './Layout/auth-blank/auth-blank.component';
import { LeavesComponent } from './Core/leaves/leaves.component';
import { authGuard } from './Shared/Guard/auth.guard';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate:[authGuard],
    component: AuthBlankComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'leaves', component: LeavesComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'user-profile', component: UserProfileComponent },
    ],
  },

  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
