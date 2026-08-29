import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { EmployeesService } from '../../Shared/Services/employees.service';
import { LeavesService } from '../../Shared/Services/leaves.service';
import { DepartmentsService } from '../../Shared/Services/departments.service';
import { Employees } from '../../Shared/interface/employees';
import { Departments } from '../../Shared/interface/departments';
import { Leaves } from '../../Shared/interface/leaves';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit{
  constructor(
    private employeesService: EmployeesService,
    private leavesService: LeavesService,
    private departmentsService: DepartmentsService
    ) {}

    totalEmployees: number = 0;
  activeEmployees: number = 0;
  departmentsCount: number = 0;
  employeesOnLeave: number = 0;
  ngOnInit(): void {
    this.getEmployeesStatistics();
    this.getDepartmentsCount();
    this.getEmployeesOnLeave();
  }
  getEmployeesStatistics(){
    this.employeesService.getEmployees().subscribe({
      next:(response: Employees[]) =>{
        this.totalEmployees = response.length
        this.activeEmployees = response.length
      },
        error: error => {
        console.log(error);
      }
    });

  }
  getDepartmentsCount(){
    this.departmentsService.getDepartments().subscribe({
      next:(response: Departments[])=>{
        this.departmentsCount = response.length
      }
    })
  }
  getEmployeesOnLeave(){
   this.leavesService.getLeaves().subscribe({
    next:(reponse:Leaves[])=>{
      this.employeesOnLeave = reponse.length
    }
   })
  }
}
